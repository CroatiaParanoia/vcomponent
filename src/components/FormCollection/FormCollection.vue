<script>
import Vue from 'vue';
import formController from './../../mixins/formController';
import './FormItemGroup';

export default Vue.component('FormCollection', {
  mixins: [formController],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Object,
      default: () => ({}),
    },
    inline: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: String,
      default: undefined,
    },
    labelPosition: {
      type: String,
      default: 'right',
    },
    formName: {
      type: String,
      default: 'form',
    },
  },

  methods: {
    validateForm(cb) {
      const { formName } = this.$props;
      this.validate(formName, cb);
    },
    validateFormField(fields, cb) {
      const { formName } = this.$props;
      this.validateField(formName, fields, cb);
    },
    resetFormFields() {
      const { formName } = this.$props;
      this.resetFields(formName);
    },
    clearFormValidate(fileds) {
      const { formName } = this.$props;
      this.clearValidate(formName, fileds);
    },
  },

  render(createElement) {
    const { options, dataSource, formName, ...otherProps } = this.$props;

    const scopedSlots = Object.entries(this.$slots).reduce((res, [key, value]) => {
      res[key] = () => value;
      return res;
    }, {});

    const collectionGroupVNode = createElement('a-form-item-group', {
      props: { options, scopedSlots, dataSource },
    });

    return createElement(
      'el-form',
      {
        props: { ...otherProps, model: dataSource },
        class: 'a-form-collection',
        ref: formName,
      },
      [collectionGroupVNode],
      // options.map((item, index) => {
      //   return createElement('a-form-collection-item', {
      //     props: { templateItem: item, dataSource },
      //     key: item.name || index,
      //     scopedSlots: scopedSlots,
      //   });
      // }),
    );
  },
});
</script>

<style>
.a-form-collection .el-form-item .el-form-item {
  margin-bottom: 30px;
}
</style>
