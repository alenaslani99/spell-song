import axios from "@/axios";

export default {
  async login(context, payload) {
    const response = await axios.post("/login", payload);
    context.commit("setToken", response.data.authorisation.token);
    context.commit("setUserId", response.data.user.id);
    context.commit("setUserInfo", response.data.user);
    context.commit("setRole", response.data.user.role.role_name);
  },
  logout(context) {
    context.commit("clearToken");
    context.commit("clearUserId");
    context.commit("clearRole");
    context.commit("clearUserInfo");
    context.commit("clearCart");
  },
  sub(context, payload) {
    if (!localStorage.getItem("subs")) context.commit("setSub", payload);
  },
  async register(_, payload) {
    await axios.post("/register", payload);
  },
  async User(context, id) {
    const response = await axios.get("/user/" + id);
    context.commit("setUserInfo", response.data);
  },
};
