export default {
  setToken(state, token) {
    localStorage.setItem("token", token);
    state.token = token;
  },
  clearToken(state) {
    localStorage.removeItem("token");
    state.token = null;
  },
  clearRole(state) {
    localStorage.removeItem("role");
    state.role = null;
  },
  clearUserId(state) {
    localStorage.removeItem("userId");
    state.userId = null;
  },
  clearUserInfo(state) {
    localStorage.removeItem("userInfo");
    state.userInfo = null;
  },
  setSub(state, id) {
    localStorage.setItem("subs", id);
    state.sub = id;
  },
  setUserId(state, userId) {
    if (userId == null) {
      localStorage.removeItem("userId");
    } else {
      localStorage.setItem("userId", userId);
    }
    state.userId = userId;
  },
  setRole(state, role) {
    if (role == null) {
      localStorage.removeItem("role");
    } else {
      localStorage.setItem("role", role);
    }
    state.role = role;
  },
  setUserInfo(state, userinfo) {
    if (userinfo == null) {
      localStorage.removeItem("userInfo");
    } else {
      localStorage.setItem("userInfo", userinfo);
    }
    state.userInfo = userinfo;
  },
  clearCart(state) {
    localStorage.removeItem("cart");
    state.cart = [];
  },
};
