<template>
  <div class="app-navbar">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Vue Apollo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home {{ isAuth }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item" v-if="!isAuth">
            <router-link class="nav-link" to="/auth/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isAuth">
            <router-link class="nav-link" to="/auth/register"
              >Register</router-link
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <router-link class="nav-link" to="/dashboard/my-profile"
              >Profile</router-link
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <router-link class="nav-link" to="/dashboard/my-posts"
              >My Posts</router-link
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <router-link class="nav-link" to="/dashboard/logout"
              >Logout</router-link
            >
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters({
        isAuth: "Auth/isAuth",
      }),
    },
  };
</script>
