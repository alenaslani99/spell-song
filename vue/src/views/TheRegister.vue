<template>
  <section class="rounded mt-5">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card text-white">
            <div class="card-body p-5 text-center">
              <!-- Pocetak Forma -->
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Register</h2>

                <text-input
                  @keyup="validate('username')"
                  v-model="regadata.username.value"
                  label="Username"
                  id="username"
                />
                <p class="text-danger" v-if="regadata.username.errormsg">
                  {{ regadata.username.errormsg }}
                </p>
                <text-input
                  @keyup="validate('email')"
                  v-model="regadata.email.value"
                  label="Email"
                  id="email"
                />
                <p class="text-danger" v-if="regadata.email.errormsg">
                  {{ regadata.email.errormsg }}
                </p>
                <text-input
                  @keyup="validate('password')"
                  v-model="regadata.password.value"
                  label="Password"
                  id="password"
                  type="password"
                />
                <p class="text-danger" v-if="regadata.password.errormsg">
                  {{ regadata.password.errormsg }}
                </p>
                <text-input
                  @keyup="validate('confpassword')"
                  v-model="regadata.confpassword.value"
                  label="Confirm password"
                  id="confpassword"
                  type="password"
                />
                <p class="text-danger" v-if="regadata.confpassword.errormsg">
                  {{ regadata.confpassword.errormsg }}
                </p>

                <button
                  @click.prevent="register"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  class="btn btn-outline-light btn-lg px-5"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <!-- Kraj Forma -->
              <p v-if="infomsg" :class="msg ? 'text-danger' : 'text-success'">
                {{ infomsg }}
              </p>
              <div>
                <p class="mb-0">
                  You already have an account?
                  <router-link to="/login" class="text-white-50 fw-bold"
                    >Login</router-link
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
import TextInput from "@/components/inputfields/TextInput.vue";
export default {
  components: { TextInput },
  name: "TheRegister",
  data() {
    return {
      regadata: {
        username: {
          value: "",
          errormsg: "",
        },
        email: {
          value: "",
          errormsg: "",
        },
        password: {
          value: "",
          errormsg: "",
        },
        confpassword: {
          value: "",
          errormsg: "",
        },
      },
      error: false,
      msg: false,
      infomsg: "",
    };
  },
  methods: {
    async register() {
      if (!this.error) {
        const dataforsend = {
          email: this.regadata.email.value,
          username: this.regadata.username.value,
          password: this.regadata.password.value,
        };
        try {
          await this.$store.dispatch("auth/register", dataforsend);
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 2000);
          this.msg = false;
          this.infomsg = "Registration successful, welcome!";
        } catch (error) {
          if (error.status == 400) {
            this.regadata.email.errormsg = error.response.data.errors["email"];
            this.regadata.username.errormsg =
              error.response.data.errors["username"];
          } else {
            this.msg = true;
            this.infomsg = "Please try later.";
          }
        }
      }
    },
    validate(type) {
      switch (type) {
        case "username":
          if (
            this.regadata.username.value.length < 2 ||
            this.regadata.username.value.length > 50
          ) {
            this.error = true;
            this.regadata.username.errormsg =
              "The username must be between 2 and 50 characters long.";
          } else {
            this.error = false;
            this.regadata.username.errormsg = "";
          }
          break;
        case "email":
          //eslint-disable-next-line
          if (
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.regadata.email.value)
          ) {
            this.error = true;
            this.regadata.email.errormsg =
              "The email address entered is not in the correct format!";
          } else {
            this.error = false;
            this.regadata.email.errormsg = "";
          }
          break;
        case "password":
          //eslint-disable-next-line
          if (
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
              this.regadata.password.value,
            )
          ) {
            this.error = true;
            this.regadata.password.errormsg =
              "The password must contain at least one uppercase letter, one lowercase letter, one number, and be more than 8 characters long.";
          } else {
            this.error = false;
            this.regadata.password.errormsg = "";
          }
          break;
        case "confpassword":
          if (
            this.regadata.confpassword.value != this.regadata.password.value
          ) {
            this.error = true;
            this.regadata.confpassword.errormsg = "The passwords do not match.";
          } else {
            this.error = false;
            this.regadata.confpassword.errormsg = "";
          }
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
