<script>
import Vue from 'vue';
import { FormElementMapping } from './config';
import './../../a-components/Wrapper';
import './../../a-components/Text';
import './../../a-components/CheckboxGroup';
import './../../a-components/SelectGroup';
import './../../a-components/Input';

export default Vue.component('AFormCollectionItem', {
  props: {
    templateItem: {
      type: Object,
      default: () => ({}),
    },
    dataSource: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    createChildVNode(createElement, children = []) {
      const { templateItem, dataSource } = this.$props;
      const { element, name, config, $sourceKey = 'value' } = templateItem;
      const tag = FormElementMapping[element];

      const hasChildren = !!children.length;
      const { style, class: className } = config;

      const computedFormValue = (name) => {
        if (hasChildren) return {};
        const { $format = (v) => v } = templateItem;
        if (!name) return config[$sourceKey];

        return $format(dataSource[name], dataSource);
      };

      const curProps = hasChildren
        ? {}
        : {
            ...config,
            [$sourceKey]: computedFormValue(name),
          };

      const mixinValue = { ...curProps, ...this.attrs };

      if (element === 'Slot') {
        return this.$scopedSlots[name];
      }

      return createElement(
        tag,
        {
          props: { ...mixinValue },
          attrs: { ...mixinValue },
          on: {
            input: (value) => {
              dataSource[name] = value;
              this.$emit('input', value, name);
            },
          },
          style: style,
          class: className,
        },
        children,
      );
    },
  },
  render(createElement) {
    const { element, children = [], ...otherProps } = this.templateItem;

    const { dataSource } = this.$props;

    if (element === 'Text') {
      return this.createChildVNode(createElement);
    }

    const isWrapper = element === 'Wrapper';

    const formItemChildrenVNode = isWrapper
      ? this.createChildVNode(
          createElement,
          children.map((item, index) => {
            return createElement('a-form-collection-item', {
              props: { templateItem: item, dataSource },
              key: item.name || index,
              on: {
                input: (value, name) => {
                  this.$emit('input', value, name);
                },
              },
            });
          }),
        )
      : this.createChildVNode(createElement);

    const { style, class: className } = otherProps;

    return createElement(
      'el-form-item',
      {
        props: { ...otherProps, prop: isWrapper ? undefined : otherProps.name },
        style,
        class: className,
      },
      [formItemChildrenVNode],
    );
  },
});
</script>

<style scoped></style>
