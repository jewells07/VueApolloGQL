import store from "../store";
import DashboardView from "@/views/Dashboard/index.vue";

export default {
  path: "/dashboard",
  name: "Dashboard",
  component: DashboardView,
  meta: {
    requiresAuth: true,
  },
  redirect: "/dashboard/my-posts",
  children: [
    {
      path: "my-posts",
      name: "MyPosts",
      component: () => import("@/views/Dashboard/UserPosts.vue"),
    },
    {
      path: "my-profile",
      name: "MyProfile",
      component: () => import("@/views/Dashboard/Profile.vue"),
    },
    {
      path: "add-post",
      name: "AddPost",
      component: () => import("@/views/Dashboard/AddPost.vue"),
    },
    {
      path: "logout",
      name: "Logout",
      beforeEnter: (to, from, next) => {
        store.dispatch("Auth/logoutUser");
        next("/auth/login");
      },
    },
  ],
};
