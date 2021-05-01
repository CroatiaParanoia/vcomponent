import { FormItem as ElFormItem } from 'element-ui';
import equal from 'fast-deep-equal';
import { getFormElementByName } from './formMapping';

const FormCollectionItem = {
  name: 'FormCollectionItem',
  inheritAttrs: false,
  props: {
    template: {
      type: Object,
      default: () => ({}),
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Boolean, Number, Object, Array],
    },
  },
  computed: {
    element() {
      return this.template.element;
    },
    isWrapper() {
      return this.element === 'Wrapper';
    },
    isText() {
      return this.element === 'Text';
    },
  },
  methods: {
    computedFormValue(name) {
      const { config = {}, $format = (v) => v, $sourceKey = 'value' } = this.template;
      const modelValue = this.value;
      if (!name) return $format(config[$sourceKey], modelValue);

      const newValue = $format(modelValue[name], modelValue);

      if (!equal(newValue, modelValue[name])) {
        modelValue[name] = newValue;
      }

      return modelValue[name];
    },

    createChildVNode(createEl, children) {
      const { name, config = {}, $sourceKey = 'value' } = this.template;

      const { style, class: className, ...otherConfig } = config;

      const formElement = getFormElementByName(this.element);

      const currentProps = {
        ...otherConfig,
        [$sourceKey]: this.computedFormValue(name),
      };

      if (this.element === 'Slot') {
        return this.$slots.default || this.$scopedSlots[name];
      }

      return createEl(
        formElement,
        {
          props: currentProps,
          attrs: { ...currentProps },
          on: {
            input: (value) => {
              this.value[name] = value;
              this.$emit('input', value, name);
            },
          },
          style: style,
          class: className,
        },
        children,
      );
    },

    createElFormItem(createEl, children) {
      const { name, ...otherTemplate } = this.template;

      return createEl(ElFormItem, { props: { ...otherTemplate, prop: name }, attrs: this.$attrs }, [].concat(children));
    },

    createFormCollectionItems(createEl) {
      const { content } = this.template;

      if (!Array.isArray(content)) {
        throw new Error(`'content' is required in Wrapper!`);
      }

      const children = content.map((item) => {
        return createEl(FormCollectionItem, {
          props: { value: this.value, name: this.name, template: item },
          attrs: this.$attrs,
        });
      });

      const wrapper = this.createChildVNode(createEl, children);

      return this.createElFormItem(createEl, [wrapper]);
    },
  },

  render(createEl) {
    const { $visible = () => true } = this.template;

    const isRender = $visible(this.value);

    if (!isRender) return null;

    if (this.isWrapper) {
      return this.createFormCollectionItems(createEl);
    }

    const childVNode = this.createChildVNode(createEl);

    if (this.isText) {
      return childVNode;
    }

    return this.createElFormItem(createEl, childVNode);
  },
};

export default FormCollectionItem;
