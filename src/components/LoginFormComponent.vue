<template>
  <!-- Login Form -->
  <div
    v-if="login_show_alert"
    :class="login_alert_variant"
    class="text-white text-center font-bold p-4 mb-4">
    {{ login_alert_msg }}
  </div>
  <vee-form
    :validation-schema="schema"
    @submit="login"
  >
    <!-- Email -->
    <div class="mb-3">
      <label class="block mb-2" for='_'>Email
        <vee-field
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          name="email"
          placeholder="Enter Email"
          type="email"/>
      </label>
      <ErrorMessage class="text-red-600 block" name="email"></ErrorMessage>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="block mb-2" for="_">Password
        <vee-field
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          name="password"
          placeholder="Password"
          type="password"/>
      </label>
      <ErrorMessage class="text-red-600 block" name="password"></ErrorMessage>
    </div>
    <button
      :disabled="login_in_submission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700"
      type="submit">
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'LoginFormComponent',
  data() {
    return {
      schema: {
        email: 'required|email',
        password: 'required|min:3|max:100',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'Please wait! We are logging you in.',
    };
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    async login(values, { resetForm }) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_msg = 'Please wait! We are logging you in.';

      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = 'bg-red-500';
        this.login_alert_msg = 'Invalid login details.';
        return;
      }

      this.login_alert_variant = 'bg-green-500';
      this.login_alert_msg = 'Success! You are now logged in.';
      this.$router.push({ name: 'home' });
      this.resetToDefault(resetForm);
      // window.location.reload();
    },
    resetToDefault(resetForm) {
      setTimeout(() => {
        this.login_in_submission = false;
        this.login_show_alert = false;
        this.toggleAuthModal();
        resetForm();
      }, 300);
    },
  },
};
</script>

<style scoped>

</style>
