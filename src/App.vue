<template>
  <HeaderComponent></HeaderComponent>

  <router-view v-slot="{ Component }">
    <transition
      :css="true"
      mode="out-in"
      name="fade"

    >
      <Component :is="Component"></Component>
    </transition>
  </router-view>
  <!--  <router-view></router-view>-->

  <PlayerComponent></PlayerComponent>

  <AuthComponent></AuthComponent>
</template>

<style scoped>

</style>
<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import PlayerComponent from '@/components/PlayerComponent.vue';
import AuthComponent from '@/components/AuthComponent.vue';

export default {
  components: {
    AuthComponent,
    PlayerComponent,
    HeaderComponent,
  },
  created() {
    this.$store.dispatch('init_login');
  },
  methods: {
    enter(el, done) {
      // console.log('enter', el);

      const animation = el.animate(
        [
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },
        ],
        {
          duration: 500,
        },
      );
      animation.onfinish = () => {
        done();
      };
    },
    leave(el, done) {
      // console.log('leave', el);

      const animation = el.animate(
        [
          {
            opacity: 1,
          },
          {
            opacity: 0,
          },
        ],
        {
          duration: 500,
        },
      );
      animation.onfinish = () => {
        done();
      };

      setTimeout(() => {
        done();
      }, 2000);
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
