<template>
  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-white p-5 pb-4 text-left align-top w-full h-16">
    <div class="relative">
      <!-- Play/Pause Button -->
      <div class="float-left w-7 h-7 leading-3">
        <button
          id="player-play-button"
          type="button"
          @click.prevent="toggleAudio"
        >
          <em
            :class="{ 'fa-play': !playing,  'fa-pause': playing, }"
            class="fa text-gray-500 text-xl"
          ></em>
        </button>
      </div>
      <!-- Current Position -->
      <div class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-5 mt-1">
        <span class="player-currenttime">{{ seek }}</span>
      </div>
      <!-- Scrub -->
      <div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">
        <div
          v-if="currentSong.modified_name"
          class="absolute left-0 right-0 text-lg text-center mx-auto player-song-info"
        >
          <span class="song-title">{{ currentSong.modified_name }}</span> by
          <span class="song-artist">{{ currentSong.display_name }}</span>
        </div>
        <!-- Scrub Container  -->
        <span
          class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer"
          @click.prevent="updateSeek"
          @keyup.prevent="updateSeek"
        >
          <!-- Player Ball -->
          <span
            :style="{ left: (playerProgress - 0.8) + '%' }"
            class="absolute top-neg-8 text-gray-800 text-lg"
          >
            <em class="fas fa-circle"></em>
          </span>
          <!-- Player Progress Bar-->
          <span
            :style="{ width: (playerProgress) + '%' }"
            class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          ></span>
        </span>
      </div>
      <!-- Duration -->
      <div class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-8 mt-1">
        <span class="player-duration">{{ duration }}</span>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'PlayerComponent',
  computed: {
    ...mapGetters(['playing']),
    ...mapState({
      seek: (state) => state.player.seek,
      duration: (state) => state.player.duration,
      playerProgress: (state) => state.player.playerProgress,
      currentSong: (state) => state.player.currentSong,
    }),
  },
  methods: {
    ...mapActions(['toggleAudio', 'updateSeek']),
  },
};
</script>

<style scoped>

</style>
