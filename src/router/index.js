import Vue from "vue";
import VueRouter from "vue-router";
import PublicRoutes from "./Public";
import AuthRoutes from "./Auth";
import DashboardRoutes from "./Dashboard";

Vue.use(VueRouter);

const routes = [AuthRoutes, DashboardRoutes, ...PublicRoutes];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
