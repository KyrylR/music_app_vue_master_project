<template>
  <!-- Registration Form -->
  <div v-if="reg_show_alert"
       :class="reg_alert_variant" class="text-white text-center font-bold p-4 mb-4">
    {{ reg_alert_msg }}
  </div>
  <vee-form
    :initial-values="userData"
    :validation-schema="schema"
    @submit="register"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="block mb-2" for="_">Name
        <vee-field
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          name="name"
          placeholder="Enter Name"
          type="text"
        />
      </label>
      <ErrorMessage class="text-red-600" name="name"></ErrorMessage>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="block mb-2" for="_">Email
        <vee-field
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          name="email"
          placeholder="Enter Email"
          type="email"/>
      </label>
      <ErrorMessage class="text-red-600" name="email"></ErrorMessage>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="block mb-2" for="_">Age
        <vee-field
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          name="age"
          type="number"/>
      </label>
      <ErrorMessage class="text-red-600" name="age"></ErrorMessage>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="block mb-2" for="_">Password
        <vee-field v-slot="{ field, errors }" name="password">
          <input
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"
            type="password" v-bind="field"/>
          <div v-for="error in errors" :key="error" class="text-red-600">
            {{ error }}
          </div>
        </vee-field>
      </label>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="block mb-2" for="_">Confirm Password
        <vee-field
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          name="confirm_password"
          placeholder="Confirm Password"
          type="password"/>
        <ErrorMessage class="text-red-600" name="confirm_password"></ErrorMessage>
      </label>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="block mb-2" for="_">Country
        <vee-field
          as="select"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          name="country">
          <option value="Ukraine">Ukraine</option>
          <option value="USA">USA</option>
          <option value="Germany">Germany</option>
          <option value="Antarctica">Antarctica</option>
        </vee-field>
      </label>
      <ErrorMessage class="text-red-600" name="country"></ErrorMessage>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        class="w-4 h-4 float-left -ml-6 mt-1 rounded" name="tos"
        type="checkbox" value="1"/>
      <i18n-t class="inline-block" keypath="register.accept" tag="label">
        {{ $tc('register.accept') }}<a href="#">{{ $tc('register.TOS') }}</a>
      </i18n-t>
      <ErrorMessage class="text-red-600 block" name="tos"></ErrorMessage>
    </div>
    <button
      :disabled="reg_in_submission"
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
  name: 'RegistrationFormComponent',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:30|alpha_spaces',
        email: 'required|email',
        age: 'required|min_value:18|max_value:130',
        password: 'required|min:8|max:100',
        confirm_password: 'password_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'Ukraine',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    async register(values, { resetForm }) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';

      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = 'An unexpected error occurred. Please try again later.';
        return;
      }

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your account has been created.';
      this.$router.push({ name: 'home' });
      this.resetToDefault(resetForm);
      // window.location.reload();
    },
    resetToDefault(resetForm) {
      setTimeout(() => {
        this.reg_in_submission = false;
        this.reg_show_alert = false;
        this.toggleAuthModal();
        resetForm();
      }, 300);
    },
  },
};
</script>

<style scoped>

</style>
