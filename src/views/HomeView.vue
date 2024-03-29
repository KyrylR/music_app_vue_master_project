<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        id="intro-section"
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus et dolor mollis, congue augue non, venenatis elit.
            Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
            sapien. Duis sed magna pulvinar, fringilla lorem eget,
            ullamcorper urna.
          </p>
        </div>
      </div>

      <img alt=""
           class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
           src="../../public/assets/img/introduction-music.png"/>
    </section>

    <!-- Main Content -->
    <section class="md:container md:mx-auto content-center">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div
          v-icon-secondary="{ icon: 'headphones-alt', right: true }"
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <!--          <em class="fa fa-headphones-alt float-right text-green-400 text-xl"></em>-->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongItemComponent
            v-for="song in songs"
            :key="song.docId"
            :song="song"
          ></SongItemComponent>
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>

import { songsCollection } from '@/includes/firebase';
import SongItemComponent from '@/components/SongItemComponent.vue';
import IconSecondary from '@/directives/icon-secondary';

export default {
  name: 'HomeView',
  components: {
    SongItemComponent,
  },
  directives: {
    'icon-secondary': IconSecondary,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 15,
      pendingRequest: false,
    };
  },
  async created() {
    await this.getSongs();

    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let snapshots;
      if (this.songs.length) {
        const lastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].docId)
          .get();
        snapshots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docId: document.id,
          ...document.data(),
        });
      });

      this.pendingRequest = false;
    },
    handleScroll() {
      const {
        scrollTop,
        offsetHeight,
      } = document.documentElement;
      const { innerHeight } = window;
      const bottomWindow = Math.round(scrollTop) + innerHeight + 1200 >= offsetHeight;

      if (bottomWindow) {
        this.getSongs();
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
#intro-section {
  background-image: url('../../public/assets/img/header.png');
}
</style>
