import FormItems from './FormItems.js';

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
    formName: {
      type: String,
      default: 'form',
    },
  },
  computed: {
    $form() {
      return this.$refs[this.formName];
    },
  },
  methods: {
    validate(cb) {
      this.$form.validate(cb);
    },
    validateField(fields, cb) {
      this.$form.validateField(fields, cb);
    },
    resetFields() {
      this.$form.resetFields();
    },
    clearValidate(fields) {
      this.$form.clearValidate(fields);
    },
  },
  render(createElement) {
    const { dataSource, formName, options, ...otherProps } = this.$props;

    const scopedSlots = Object.entries(this.$slots).reduce((res, [key, value]) => {
      res[key] = () => value;
      return res;
    }, {});

    const collectionGroupVNode = createElement(FormItems, {
      props: { options, scopedSlots, dataSource },
    });

    return createElement(
      'el-form',
      {
        props: { ...otherProps, ...this.$attrs, model: dataSource },
        class: 'form-collection',
        ref: formName,
      },
      [collectionGroupVNode],
    );
  },
};
