import DashboardView from "@/views/Dashboard/index.vue";

export default {
  path: "/dashboard",
  name: "Dashboard",
  component: DashboardView,
  redirect: "/dashboard/my-posts",
  children: [
    {
      path: "my-posts",
      name: "MyPosts",
      component: () => import("@/views/Dashboard/Posts.vue"),
    },
    {
      path: "my-profile",
      name: "MyProfile",
      component: () => import("@/views/Dashboard/Profile.vue"),
    },
  ],
};
