import { REGISTER_USER, AUTHENTICATED_USER } from "../../gql";
import { apolloClient } from "../../vue-apollo";
import router from "../../router";

const state = {
  user: {},
  authStatus: false,
  token: localStorage.getItem("apollo-token") || null,
};

const getters = {
  user: (state) => state.user,
  isAuth: (state) => !!state.token,
  authStatus: (state) => state.authStatus,
};

const actions = {
  async registerUser(
    {
      // eslint-disable-next-line
      commit,
    },
    userData
  ) {
    let {
      data: { registerUser },
    } = await apolloClient.mutate({
      mutation: REGISTER_USER,
      variables: userData,
    });
    commit("LOGIN_USER", registerUser);
    commit("SET_TOKEN", registerUser);
    //Set token in localstorage
    localStorage.setItem("apollo-token", registerUser.token.split(" ")[1]);
    // Redirect the user to the Dashboard
    router.push("/dashboard");
  },
  async getAuthUser({ commit }) {
    let {
      data: { authUserProfile },
    } = await apolloClient.query({
      query: AUTHENTICATED_USER,
    });
    commit("LOGIN_USER", { user: authUserProfile });
  },
};

const mutations = {
  LOGIN_USER(state, payload) {
    state.user = payload.user;
    state.authStatus = true;
  },
  SET_TOKEN(state, payload) {
    state.token = payload.token;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
