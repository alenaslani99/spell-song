import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      userId: null,
      role: null,
      userInfo: null,
    };
  },
  mutations,
  getters,
  actions,
};
