import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import header from "./components/header";
import about from "./pages/about";
import login from "./pages/login";

const routes = [
  {
    path: "/",
    components: {
      default: about,
      header: header
    }
  },
  {
    path: "/login",
    components: {
      default: login
    }
  }
];

export default new VueRouter({ routes });