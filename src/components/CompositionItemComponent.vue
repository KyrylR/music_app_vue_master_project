<template>
  <!-- Composition Items -->
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click="deleteSong"
      >
        <em class="fa fa-times"></em>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <em class="fa fa-pencil-alt"></em>
      </button>
    </div>
    <div v-show="showForm">
      <div v-if="show_alert" :class="alert_variant"
           class="text-white text-center font-bold p-4 mb-4">
        {{ alert_message }}
      </div>
      <vee-form
        :initial-values="song"
        :validation-schema="schema"
        @submit="edit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2" for="_">Song Title</label>
          <vee-field
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
            name="modified_name"
            placeholder="Enter Song Title"
            type="text"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name"/>
        </div>
        <div class="mb-3">
          <label class="block mb-2" for="_">Genre</label>
          <vee-field
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
            name="genre"
            placeholder="Enter Genre"
            type="text"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre"/>
        </div>
        <button
          :disabled="in_submission"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          type="submit"
        >
          Submit
        </button>
        <button
          :disabled="in_submission"
          class="py-1.5 px-3 rounded text-white bg-gray-600 mx-3"
          type="button"
          @click.prevent="showForm = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase';

export default {
  name: 'CompositionItemComponent',
  props: {
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: 'required',
        genre: 'alpha_spaces',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait! Updating song info.',
    };
  },
  methods: {
    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);

      await songRef.delete();

      await songsCollection.doc(this.song.docID)
        .delete();

      this.removeSong(this.index);
    },
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Please wait! Updating song info.';

      try {
        // console.log(values);
        await songsCollection.doc(this.song.docID)
          .update(values);
      } catch (error) {
        this.in_submission = false;
        this.alert_variant = 'bg-red-500';
        this.alert_message = 'Something went wrong! Try again later';
        return;
      }

      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);

      this.in_submission = false;
      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Success!';
    },
  },
};
</script>

<style scoped>

</style>
