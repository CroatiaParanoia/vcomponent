<script>
import Vue from 'vue';
import './FormCollectionItem';

export default Vue.component('AFormItemGroup', {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Object,
      default: () => ({}),
    },
    scopedSlots: {
      type: Object,
      default: undefined,
    },
  },
  render(createElement) {
    const { dataSource, options, scopedSlots: scopedSlotsProp } = this.$props;

    const scopedSlots =
      scopedSlotsProp ||
      Object.entries(this.$slots).reduce((res, [key, value]) => {
        res[key] = () => value;
        return res;
      }, {});

    console.log(scopedSlotsProp, 'scopedSlotsProp');

    return createElement(
      'div',
      {
        class: 'a-form-collection-group',
      },
      options.map((item, index) => {
        return createElement('a-form-collection-item', {
          props: { templateItem: item, dataSource },
          key: item.name || index,
          scopedSlots: scopedSlots,
        });
      }),
    );
  },
});
</script>
