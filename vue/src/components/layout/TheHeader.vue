<template>
  <!-- MENU BAR -->
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link class="navbar-brand" to="/">Spell song</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <the-nav></the-nav>
        <ul class="social-icon ml-lg-3">
          <li><a href="https://fb.com/tooplate" class="fa fa-facebook"></a></li>
          <li><a href="#" class="fa fa-twitter"></a></li>
          <li><a href="#" class="fa fa-instagram"></a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import TheNav from "./TheNav.vue";
export default {
  components: { TheNav },
};
</script>
