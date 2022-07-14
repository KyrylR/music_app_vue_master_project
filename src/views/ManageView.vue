<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <UploadComponent ref="upload" :addSong="addSong"></UploadComponent>
        </div>
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">{{ $t('manage.my_songs') }}</span>
              <em class="fa fa-compact-disc float-right text-green-400 text-2xl"></em>
            </div>
            <div class="p-6">
              <CompositionItemComponent
                v-for="(song, idx) in songs"
                :key="song.docID"
                :index="idx"
                :removeSong="removeSong"
                :song="song"
                :updateSong="updateSong"
                :updateUnsavedFlag="updateUnsavedFlag"
              ></CompositionItemComponent>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import UploadComponent from '@/components/UploadComponent.vue';
import { auth, songsCollection } from '@/includes/firebase';
import CompositionItemComponent from '@/components/CompositionItemComponent.vue';

export default {
  name: 'ManageView',
  components: {
    UploadComponent,
    CompositionItemComponent,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  async created() {
    const snapshot = await songsCollection
      .where('uid', '==', auth.currentUser.uid)
      .get();

    snapshot.forEach(this.addSong);
  },
  methods: {
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };

      this.songs.push(song);
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(_to, _from, next) {
    if (!this.unsavedFlag) {
      next(true);
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
      next(leave);
    }
  },
  // beforeRouteLeave(_to, _from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // beforeRouteEnter(_to, _from, next) {
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'home' });
  //   }
  // },
};
</script>
