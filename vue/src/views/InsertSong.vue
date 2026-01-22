<template>
  <div class="container">
    <h1 class="text-center">Add song</h1>
    <div class="row">
      <div class="col-lg-4">
        <text-input
          @keyup="validate('name')"
          v-model="insertData.name.value"
          id="name"
          label="Name"
        />
        <p class="text-danger" v-if="insertData.name.errormsg">
          {{ insertData.name.errormsg }}
        </p>
      </div>
      <div class="col-lg-4">
        <text-input
          @keyup="validate('price')"
          v-model="insertData.price.value"
          id="price"
          label="Price"
        />
        <p class="text-danger" v-if="insertData.price.errormsg">
          {{ insertData.price.errormsg }}
        </p>
      </div>
      <div class="col-lg-4">
        <text-input
          @keyup="validate('image')"
          v-model="insertData.image.value"
          id="image"
          label="Image"
          placeholder="Image URL"
        />
        <p class="text-danger" v-if="insertData.image.errormsg">
          {{ insertData.image.errormsg }}
        </p>
      </div>
    </div>
    <h2 class="text-center p-2">Genres</h2>
    <div class="row">
      <div v-for="g in genres" :key="g.id" class="col-lg-4">
        <div class="form-check form-check-inline">
          <input
            v-model="insertData.selectedGenres.value"
            class="form-check-input"
            type="checkbox"
            :id="g.id"
            :value="g.id"
          />
          <label class="form-check-label" :for="g.id">{{ g.genre_name }}</label>
        </div>
      </div>
      <p class="text-danger" v-if="insertData.selectedGenres.errormsg">
        {{ insertData.selectedGenres.errormsg }}
      </p>
    </div>
    <div class="row m-4">
      <button
        @click.prevent="insert"
        type="submit"
        class="btn btn-primary btn-lg btn-block"
      >
        Add new song
      </button>
    </div>
    <p v-if="infomsg" :class="msg ? 'text-danger' : 'text-success'">
      {{ infomsg }}
    </p>
  </div>
</template>
<script>
import TextInput from "@/components/inputfields/TextInput.vue";
import { mapGetters } from "vuex";
export default {
  components: { TextInput },
  data() {
    return {
      insertData: {
        name: {
          value: "",
          errormsg: "",
        },
        price: {
          value: "",
          errormsg: "",
        },
        image: {
          value: "",
          errormsg: "",
        },
        selectedGenres: {
          value: [],
          errormsg: "",
        },
      },
      genres: [],
      error: false,
      msg: false,
      infomsg: "",
    };
  },
  async created() {
    await this.$store.dispatch("songs/allGenres");
    this.genres = this.$store.state.songs.genres;
  },
  computed: {
    ...mapGetters(["auth/getUserId"]),
  },
  methods: {
    async insert() {
      if (!this.error) {
        const dataforsend = {
          name: this.insertData.name.value,
          artist: this["auth/getUserId"],
          genres: this.insertData.selectedGenres.value,
          price: this.insertData.price.value,
          image: this.insertData.image.value,
        };
        console.log(dataforsend);
        try {
          await this.$store.dispatch("songs/insertSong", dataforsend);
          this.msg = false;
          this.infomsg = "Song added successfully!";
        } catch (error) {
          console.log(error);
          if (error.status == 403) {
            this.insertData.name.errormsg = error.response.data.errors["name"];
            this.insertData.price.errormsg =
              error.response.data.errors["price"];
            this.insertData.image.errormsg =
              error.response.data.errors["image"];
            this.insertData.selectedGenres.errormsg =
              error.response.data.errors["genres"];
          } else {
            this.msg = true;
            this.infomsg = "Please try later.";
          }
        }
      }
    },
    validate(type) {
      switch (type) {
        case "name":
          if (this.insertData.name.value.length < 3) {
            this.error = true;
            this.insertData.name.errormsg =
              "The name must be longer than 3 characters.";
          } else {
            this.error = false;
            this.insertData.name.errormsg = "";
          }
          break;
        case "price":
          if (this.insertData.price.value < 0) {
            this.error = true;
            this.insertData.price.errormsg =
              "The price must be greater than 0.";
          } else {
            this.error = false;
            this.insertData.price.errormsg = "";
          }
          break;
        case "image":
          //eslint-disable-next-line
          if (
            !/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
              this.insertData.image.value,
            )
          ) {
            this.error = true;
            this.insertData.image.errormsg = "The image must be URL.";
          } else {
            this.error = false;
            this.insertData.image.errormsg = "";
          }
      }
    },
  },
};
</script>
