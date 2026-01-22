<template>
  <!-- HERO -->
  <section
    class="hero d-flex flex-column justify-content-center align-items-center"
    id="home"
  >
    <div class="bg-overlay"></div>

    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto col-12">
          <div class="hero-text mt-5 text-center">
            <h6>TOP #1 MUSIC MARKETPLACE!</h6>

            <h1 class="text-white">
              Welcome back
              <router-link v-if="username" :to="'/profile/' + id">{{
                username
              }}</router-link>
              !
            </h1>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- CONTACT -->
  <section class="contact section" id="contact">
    <div class="container">
      <div class="row">
        <div class="ml-auto col-lg-5 col-md-6 col-12">
          <h2 class="mb-4 pb-2">Feel free to ask anything</h2>

          <form
            action="#"
            method="post"
            class="contact-form webform"
            role="form"
          >
            <input
              type="text"
              class="form-control"
              name="cf-name"
              placeholder="Name"
            />

            <input
              type="email"
              class="form-control"
              name="cf-email"
              placeholder="Email"
            />

            <textarea
              class="form-control"
              rows="5"
              name="cf-message"
              placeholder="Message"
            ></textarea>

            <button
              type="submit"
              class="form-control"
              id="submit-button"
              name="submit"
            >
              Send Message
            </button>
          </form>
        </div>

        <div class="mx-auto mt-4 mt-lg-0 mt-md-0 col-lg-5 col-md-6 col-12">
          <h2 class="mb-4">Where you can <span>find us</span></h2>

          <p>
            <i class="fa fa-map-marker mr-1"></i> 120-240 Rio de Janeiro - State
            of Rio de Janeiro, Brazil
          </p>
          <div class="google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.358862542557!2d20.479543886239195!3d44.81425329647885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7a9609031735%3A0xc17ed71f59ac4725!2z0JLQuNGB0L7QutCwIElDVCDRiNC60L7Qu9Cw!5e0!3m2!1ssr!2srs!4v1724795939148!5m2!1ssr!2srs"
              width="1920"
              height="250"
              frameborder="0"
              style="border: 0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "TheHome",
  data() {
    return {
      username: "",
      id: null,
    };
  },
  computed: {
    ...mapGetters(["auth/getTokenInfo"]),
  },
  created() {
    if (this["auth/getTokenInfo"]) {
      this.username = this["auth/getTokenInfo"].username;
      this.id = this["auth/getTokenInfo"].id;
    }
  },
};
</script>
