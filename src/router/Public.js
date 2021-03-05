import Home from "@/views/Home.vue";
export default [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/posts/:id",
    name: "Post",
    component: () => import("@/views/Post.vue"),
  },
];
