export default {
  getToken(state) {
    if (localStorage.getItem("token")) {
      state.token = localStorage.getItem("token");
    }
    return state.token;
  },
  getAa(state) {
    if (localStorage.getItem("token")) {
      state.token = localStorage.getItem("token");
    }
    return !!state.token;
  },
  getTokenInfo(state) {
    let parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    };
    const tokenInfo = parseJwt(state.token);
    return tokenInfo;
  },
  getUserId(state) {
    if (localStorage.getItem("userId")) {
      state.userId = localStorage.getItem("userId");
    }
    return state.userId;
  },
  getRole(state) {
    if (localStorage.getItem("role")) {
      state.role = localStorage.getItem("role");
    }
    return state.role;
  },
};
