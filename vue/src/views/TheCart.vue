<template>
  <div class="container">
    <h1 class="text-center">Cart</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-lg-10">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Song name:</th>
              <th scope="col">Quantity:</th>
              <th scope="col">Price:</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody v-if="cartItems.length != 0">
            <tr v-for="(item, i) in cartItems" :key="item.song.id">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ item.song.name }}</td>
              <td>{{ item.qty }}</td>
              <td>$ {{ (item.qty * item.song.price).toFixed(2) }}</td>
              <td>
                <button
                  @click="removeItem(item.song.id)"
                  type="button"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <th>Total:</th>
              <td>$ {{ totalPrice().toFixed(2) }}</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <th></th>
              <td>
                <button
                  @click="buy"
                  type="button"
                  class="btn btn-outline-success"
                >
                  Buy
                </button>
              </td>
              <td>
                <button
                  @click="clearCart"
                  type="button"
                  class="btn btn-outline-danger"
                >
                  Delete cart
                </button>
              </td>
            </tr>
          </tbody>
          <div v-else class="div">
            <h1 class="text-center">Your cart is empty.</h1>
          </div>
        </table>
        <div v-if="msg" class="alert alert-success" role="alert">
          {{ msg }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "TheCart",
  data() {
    return {
      cartItems: [],
      msg: "",
    };
  },
  created() {
    this.loadCart();
  },
  computed: {
    ...mapGetters(["auth/getUserId"]),
  },
  methods: {
    loadCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const songss = this.$store.getters["songs/getSongs"];
      console.log(cart);
      console.log(songss);

      this.cartItems = cart
        .map((x) => {
          const song = songss.find((song) => song.id == x.id);
          return {
            song: song,
            qty: x.qty,
          };
        })
        .filter((x) => x.song);
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.qty * item.song.price;
      }, 0);
    },
    clearCart() {
      localStorage.removeItem("cart");
      this.cartItems = [];
    },
    updateLocalStorage(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
      this.loadCart();
    },
    removeItem(id) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      const item = cart.find((x) => x.id == id);
      console.log(item);
      if (item) {
        if (item.qty > 1) {
          console.log(item.qty);
          item.qty--;
        } else {
          cart = cart.filter((x) => x.id != id);
        }
        this.updateLocalStorage(cart);
      }
    },
    async buy() {
      try {
        var cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
        var total_price = this.totalPrice();
        console.log(total_price);
        const dataforsend = {
          items: cart.map((item) => ({
            id: item.id,
            qty: item.qty,
          })),
          total_price: total_price,
          user: this["auth/getUserId"],
        };
        console.log(dataforsend);
        await this.$store.dispatch("songs/buySongs", dataforsend);
        this.msg =
          "Thank you for your purchase! Your order has been successfully processed.";
        localStorage.removeItem("cart");
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
