import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Admin from "@/views/Admin.vue";
import Login from "@/views/Login.vue";
import { isLoggedIn } from "@/utils/auth.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    },
  },

  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

export default routes;
