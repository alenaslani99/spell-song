<template>
  <div class="container">
    <div class="row">
      <h1 class="text-center">Edit</h1>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <text-input
          @keyup="validate('name')"
          v-model="editData.name.value"
          id="name"
          label="Song name"
          :error="editData.name.errormsg"
        />
      </div>
      <div class="col-lg-4">
        <text-input
          @keyup="validate('price')"
          v-model="editData.price.value"
          id="price"
          label="Price"
          :error="editData.price.errormsg"
        />
      </div>
      <div class="col-lg-4">
        <text-input
          @keyup="validate('image')"
          v-model="editData.image.value"
          id="img"
          label="Image"
          placeholder="Image URL"
          :error="editData.image.errormsg"
        />
      </div>
    </div>
    <h2 class="text-center p-2">Genres</h2>
    <div class="row">
      <div v-for="g in genres" :key="g.id" class="col-lg-4">
        <div class="form-check form-check-inline">
          <input
            v-model="editData.selectedGenres.value"
            class="form-check-input"
            type="checkbox"
            :id="g.id"
            :value="g.id"
          />
          <label class="form-check-label" :for="g.id">{{ g.genre_name }}</label>
        </div>
      </div>
      <p class="text-danger" v-if="editData.selectedGenres.errormsg">
        {{ editData.selectedGenres.errormsg }}
      </p>
    </div>
    <div class="row m-4">
      <button
        @click.prevent="edit"
        type="submit"
        class="btn btn-primary btn-lg btn-block"
      >
        Edit song
      </button>
      <p v-if="infomsg" :class="msg ? 'text-danger' : 'text-success'">
        {{ infomsg }}
      </p>
    </div>
  </div>
</template>
<script>
import TextInput from "@/components/inputfields/TextInput.vue";

export default {
  name: "EditSong",
  components: { TextInput },
  data() {
    return {
      song: [],
      editData: {
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
  created() {
    this.one();
    this.genres = this.$store.state.songs.genres;
  },
  methods: {
    one() {
      this.song = this.$store.getters["songs/getOneSong"](
        this.$route.params.id,
      );
      this.editData.name.value = this.song.name;
      this.editData.price.value = this.song.price;
      this.editData.image.value = this.song.image;
      this.editData.selectedGenres.value = this.song.genre_ids
        .split(",")
        .map(Number);
    },
    async edit() {
      if (!this.error) {
        const dataforsend = {
          id: this.$route.params.id,
          name: this.editData.name.value,
          price: this.editData.price.value,
          image: this.editData.image.value,
          genres: this.editData.selectedGenres.value,
        };
        // console.log(dataforsend);
        try {
          await this.$store.dispatch("songs/edit", dataforsend);
          this.msg = false;
          this.infomsg = "Song edited successfully!";
          console.log("bravo");
        } catch (error) {
          console.log(error);
          if (error.status == 403) {
            this.editData.name.errormsg = error.response.data.errors["name"];
            this.editData.price.errormsg = error.response.data.errors["price"];
            this.editData.image.errormsg = error.response.data.errors["image"];
            this.editData.selectedGenres.errormsg =
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
          if (this.editData.name.value.length < 3) {
            this.error = true;
            this.editData.name.errormsg =
              "The name must be longer than 3 characters.";
          } else {
            this.error = false;
            this.editData.name.errormsg = "";
          }
          break;
        case "price":
          if (this.editData.price.value < 0) {
            this.error = true;
            this.editData.price.errormsg = "The price must be greater than 0.";
          } else {
            this.error = false;
            this.editData.price.errormsg = "";
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
            this.editData.image.errormsg = "The image must be URL.";
          } else {
            this.error = false;
            this.editData.image.errormsg = "";
          }
      }
    },
  },
};
</script>
