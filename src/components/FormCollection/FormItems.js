import FormItem from './FormItem';

export default {
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
  computed: {},
  render(createElement) {
    const { dataSource, options, scopedSlots: scopedSlotsProp } = this.$props;

    const scopedSlots =
      scopedSlotsProp ||
      Object.entries(this.$slots).reduce((res, [key, value]) => {
        res[key] = () => value;
        return res;
      }, {});

    return createElement(
      'div',
      {
        class: 'form-collection-items',
      },
      options.map((item, index) => {
        return createElement(FormItem, {
          props: { template: item, value: dataSource },
          key: item.name || index,
          scopedSlots: scopedSlots,
        });
      }),
    );
  },
};
