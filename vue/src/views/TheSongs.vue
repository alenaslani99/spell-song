<template>
  <div class="container p-5">
    <h1 class="text-center">Subscriptions</h1>
    <div class="row">
      <div class="col-lg-4">
        <text-input v-model="keyword" label="Search" id="search" />
      </div>
    </div>
    <div class="row">
      <the-sub-info
        v-bind="song"
        v-for="song in filterData"
        :key="song.id"
        :img="song.image"
        :name="song.name"
        :author="song.username"
        :price="song.price"
        :id="song.id"
      ></the-sub-info>
    </div>
  </div>
</template>
<script>
import TheSubInfo from "@/components/TheSubInfo.vue";
import TextInput from "@/components/inputfields/TextInput.vue";
export default {
  name: "TheSubscriptions",
  components: { TheSubInfo, TextInput },
  data() {
    return {
      songs: [],
      genres: [],
      keyword: "",
      filterData: [],
      user: [],
    };
  },
  created() {
    // await this.$store.dispatch("songs/allGenres");
    this.genres = this.$store.state.songs.genres;
    // await this.$store.dispatch("songs/allSongs");
    this.songs = this.$store.state.songs.songs;
    this.filterData = this.songs;
  },
  watch: {
    keyword() {
      this.filterData = this.songs.filter((x) => {
        if (x.name.toLowerCase().includes(this.keyword.toLowerCase())) {
          return true;
        }
        return false;
      });
    },
  },
};
</script>
