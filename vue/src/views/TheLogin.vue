<template>
  <section class="rounded mt-5">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card text-white">
            <div class="card-body p-5 text-center">
              <!-- Pocetak Forma -->
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">
                  Please enter your email and password!
                </p>

                <text-input
                  @keyup="validateEmail"
                  v-model="loginData.email.value"
                  label="Email"
                  id="email"
                  type="email"
                />
                <p class="text-danger" v-if="loginData.email.errormsg">
                  {{ loginData.email.errormsg }}
                </p>
                <text-input
                  v-model="loginData.password.value"
                  label="Password"
                  id="password"
                  type="password"
                />

                <button
                  @click.prevent="login"
                  class="btn btn-outline-light btn-lg px-5"
                  type="submit"
                >
                  Login
                </button>
                <div class="p-5">
                  <p
                    v-if="infomessage"
                    :class="msg ? 'text-danger' : 'text-success'"
                  >
                    {{ infomessage }}
                  </p>
                </div>
              </div>

              <!-- Kraj Forma -->
              <div>
                <p class="mb-0">
                  Don't have an account?
                  <router-link to="/register" class="text-white-50 fw-bold"
                    >Sign Up</router-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import TextInput from "../components/inputfields/TextInput.vue";
export default {
  components: { TextInput },
  name: "TheLogin",
  data() {
    return {
      loginData: {
        email: {
          value: "",
          errormsg: "",
        },
        password: {
          value: "",
          errormsg: "",
        },
      },
      msg: false,
      infomessage: "",
      error: false,
    };
  },
  methods: {
    async login() {
      if (!this.error) {
        const dataforsend = {
          email: this.loginData.email.value,
          password: this.loginData.password.value,
        };
        try {
          await this.$store.dispatch("auth/login", dataforsend);
          this.msg = false;
          this.infomessage = "Login successful, welcome back!";
          setTimeout(() => this.$router.push("/"), 2000);
        } catch (err) {
          this.msg = true;
          this.infomessage =
            "The email or password you entered is incorrect, please try again.";
        }
      }
    },
    validateEmail() {
      //eslint-disable-next-line
      if (
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.loginData.email.value)
      ) {
        this.error = true;
        this.loginData.email.errormsg =
          "The email address entered is not in the correct format!";
      } else {
        this.error = false;
        this.loginData.email.errormsg = "";
      }
    },
  },
};
</script>
<style scoped>
.card {
  background-color: #171819;
}
</style>
