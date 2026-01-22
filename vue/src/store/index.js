import { createStore } from "vuex";
import auth from "./auth";
import songs from "./songs";
import cart from "./cart";
export default createStore({
  modules: {
    auth,
    songs,
    cart,
  },
});
