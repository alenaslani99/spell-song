<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-4">
        <h1>{{ data.username }}</h1>
        <h2>{{ data.email }}</h2>
        <h2>{{ data.role }}</h2>
      </div>
    </div>
    <div v-if="isArtist" class="row">
      <h1>Songs</h1>
      <div class="col-lg-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Song name</th>
              <th scope="col">Price</th>
              <th scope="col">Likes</th>
              <th scope="col" class="text-primary">Edit</th>
              <th scope="col" class="text-danger">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-bind="song" v-for="(song, i) in data.songs" :key="i">
              <th scope="row">{{ i + 1 }}</th>
              <td>
                <img :src="song.image" alt="nesto" class="img-thumbnail" />
              </td>
              <td>{{ song.name }}</td>
              <td>$ {{ song.latest_price.price }}</td>
              <td>{{ song.liked_by_users_count }}</td>
              <td>
                <router-link :to="'/edit/' + song.id" class="text-primary"
                  >Edit</router-link
                >
              </td>
              <td>
                <a @click="deleteSong(song.id)" class="text-danger">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "TheProfile",
  data() {
    return {
      data: [],
    };
  },
  async created() {
    await this.$store.dispatch(
      "auth/User",
      this.$store.getters["auth/getUserId"],
    );
    this.data = this.$store.state.auth.userInfo;
  },
  computed: {
    isArtist() {
      return this["auth/getRole"] == "Artist";
    },
    ...mapGetters(["auth/getRole"]),
  },
  methods: {
    async deleteSong(id) {
      try {
        await this.$store.dispatch("songs/deleteSong", id);
        console.log("bravo");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
