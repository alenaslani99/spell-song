import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/TheHome.vue";
import TheContact from "../views/TheContact.vue";
import TheSchedule from "@/views/TheSchedule.vue";
import TheLogin from "@/views/TheLogin.vue";
import TheRegister from "@/views/TheRegister.vue";
import TheSongs from "@/views/TheSongs.vue";
import InsertSong from "@/views/InsertSong.vue";
import ProbaValidacija from "@/views/ProbaValidacija.vue";
import EditSong from "@/views/EditSong.vue";
import TheProfile from "@/views/TheProfile.vue";
import TheCart from "@/views/TheCart.vue";
import store from "../store/index";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/validacija",
    name: "validacija",
    component: ProbaValidacija,
  },
  {
    path: "/contact",
    name: "contact",
    component: TheContact,
  },
  {
    path: "/schedule",
    name: "schedule",
    component: TheSchedule,
  },
  {
    path: "/login",
    name: "login",
    component: TheLogin,
    meta: {
      isUnauth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: TheRegister,
    meta: {
      isUnauth: true,
    },
  },
  {
    path: "/songs",
    name: "songs",
    component: TheSongs,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/addSong",
    name: "addsong",
    component: InsertSong,
    beforeEnter: (to, from, next) => {
      const userRole = store.getters["auth/getRole"];
      console.log(userRole);
      if (userRole == "Artist") {
        next();
      } else {
        next({ name: "home" });
      }
    },
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: TheProfile,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditSong,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: TheCart,
    meta: {
      isAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  const parseToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (er) {
      return null;
    }
  };
  let token = parseToken(store.getters["auth/getToken"]);

  if (token != null) {
    token = token.exp;
  }
  const date = new Date().getTime() / 1000;
  if (token && date > token) {
    localStorage.removeItem("token");
    return next({ name: "login" });
  } else {
    if (to.meta.isAuth && store.getters["auth/getToken"]) {
      return next();
    } else if (to.meta.isAuth && !store.getters["auth/getToken"]) {
      return next({ name: "login" });
    } else {
      return next();
    }
  }
});

export default router;
