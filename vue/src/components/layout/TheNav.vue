<template>
  <ul class="navbar-nav ml-lg-auto">
    <router-link class="nav-link" to="/">Home</router-link>
    <router-link class="nav-link" v-if="!islog" to="/login">Login</router-link>
    <router-link class="nav-link" v-if="!islog" to="/register"
      >Register</router-link
    >
    <router-link class="nav-link" v-if="islog" to="/songs">Songs</router-link>
    <router-link class="nav-link" v-if="islog" to="/cart">Cart</router-link>
    <router-link class="nav-link" v-if="isArtist" to="/addSong"
      >Add song</router-link
    >
    <a @click="logout" class="nav-link text-danger" v-if="islog">Logout</a>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    islog() {
      var e = this["auth/getAa"];
      return e;
    },
    isArtist() {
      // console.log(this['auth/getRole'])
      return this["auth/getRole"] == "Artist";
    },
    ...mapGetters(["auth/getAa", "auth/getRole"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
