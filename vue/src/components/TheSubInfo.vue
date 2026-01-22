<template>
  <div class="col-lg-4 mb-3" :id="id">
    <div class="card bg" style="width: 18rem">
      <img :src="img" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title t">{{ name }}</h5>
        <p class="card-text t">{{ author }}</p>
        <p class="card-text t">
          <strong>$ {{ price }}</strong>
        </p>
        <a class="btn btn-warning mx-2" @click="buy(id)">Buy</a>
        <a class="btn btn-success" @click="like(id)">
          <span v-if="!liked">Like</span><span v-else>Liked</span></a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["name", "author", "price", "id", "img"],
  data() {
    return {
      liked: false,
    };
  },
  computed: {
    ...mapGetters(["auth/getUserId"]),
  },
  methods: {
    buy(id) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const productInCart = cart.find((x) => x.id == id);
      if (productInCart) {
        productInCart.qty += 1;
      } else {
        cart.push({ id: id, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    },
    async like(id) {
      const dataforsend = {
        songId: id,
        userId: this["auth/getUserId"],
      };
      console.log(dataforsend);
      await this.$store.dispatch("songs/likeSong", dataforsend);
      this.liked = true;
    },
  },
};
</script>
<style scoped>
.bg {
  background-color: #171819;
}
.t {
  color: #f13a11;
}
.p {
  background-color: #f13a11;
}
</style>
