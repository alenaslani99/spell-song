<template>
  <the-header></the-header>
  <router-view></router-view>
  <the-footer></the-footer>
</template>
<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  components:{TheFooter,TheHeader},
  async created(){
    await this.$store.dispatch("songs/allGenres");
    await this.$store.dispatch("songs/allSongs");
  }

}
</script>

