<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        :to="{ name: 'home' }"
        class="text-white font-bold uppercase text-2xl mr-4"
        exact-active-class="no-active"
      >
        Music
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link
              :to="{ name: 'about' }"
              class="px-2 text-white"
            >
              About
            </router-link>
          </li>
          <li v-if="!userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @keyup="toggleAuthModal"
              @click.prevent="toggleAuthModal">
              Login / Register
            </a>
          </li>
          <template v-else>
            <li>
              <router-link
                :to="{ name: 'manage' }"
                class="px-2 text-white"
              >
                Manage
              </router-link>
            </li>
            <li>
              <a
                class="px-2 text-white"
                href="#"
                @click.prevent="sign_out"
                @keyup.prevent="sign_out"
              >Logout</a>
            </li>
          </template>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
    currentLocale() {
      return this.$i18n.locale === 'fr' ? 'French' : 'English';
    },
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    sign_out() {
      this.$store.dispatch('sign_out', {
        route: this.$route,
        router: this.$router,
      });

      this.$router.push({ name: 'home' });

      // if (this.$route.meta.requiresAuth) {
      // this.$router.push({ name: 'home' });
      // }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
    // ...mapActions(['sign_out']),
    // sign_out() {
    //   this.$store.dispatch('sign_out');
    // },
    // toggleAuthModel() {
    //   this.$store.commit('toggleAuthModel');
    // },
  },
};
</script>

<style scoped>

</style>
