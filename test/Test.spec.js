import { mount } from '@vue/test-utils';
import BlocksInfo from '/src/components/BlocksInfo.vue';

// eslint-disable-next-line no-undef
describe('BlocksInfo.vue', () => {
  // eslint-disable-next-line no-undef
  it('block search', () => {
    const wrapper = mount(BlocksInfo);

    // eslint-disable-next-line no-undef
    expect(wrapper.vm.counter).toBe(0);

    wrapper.find('[jest="search-button"]').trigger('click');

    // eslint-disable-next-line no-undef
    expect(wrapper.vm.counter).toBe(1);
  });
});
