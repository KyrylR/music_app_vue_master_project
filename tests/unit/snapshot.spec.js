import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import SongItemComponent from '@/components/SongItemComponent.vue';

describe('Snapshots SongItem.vue', () => {
  test('renders correctly', () => {
    const song = {
      docId: 'abc',
      modified_name: 'test',
      display_name: 'test',
      comment_count: 5,
    };

    const wrapper = shallowMount(SongItemComponent, {
      propsData: { song },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    expect(wrapper.element)
      .toMatchSnapshot();
  });
});
