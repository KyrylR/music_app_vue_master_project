import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import SongItemComponent from '@/components/SongItemComponent.vue';

describe('Router', () => {
  test('renders router link', () => {
    const song = {
      display_name: 'test',
      docId: 'abc',
    };

    const wrapper = shallowMount(SongItemComponent, {
      propsData: { song },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    expect(wrapper.findComponent(RouterLinkStub)
      .props().to)
      .toEqual({
        name: 'song',
        params: { id: song.docId },
      });
  });
});
