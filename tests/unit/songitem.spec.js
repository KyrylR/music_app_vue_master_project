import SongItemComponent from '@/components/SongItemComponent.vue';
import { RouterLinkStub, shallowMount } from '@vue/test-utils';

describe('SongItemComponent.vue', () => {
  test('render song.display_name', () => {
    const song = {
      display_name: 'test',
    };

    const wrapper = shallowMount(SongItemComponent, {
      propsData: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    const compositionAuthor = wrapper.find('.text-gray-500');

    expect(compositionAuthor.text())
      .toBe(song.display_name);
  });

  test('renders song.docID in id attribute', () => {
    const song = {
      docId: 'abc',
    };

    const wrapper = shallowMount(SongItemComponent, {
      propsData: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    expect(wrapper.attributes().id)
      .toBe(`song-id-${song.docId}`);
    expect(wrapper.classes())
      .toContain(`song-id-${song.docId}`);
  });
});
