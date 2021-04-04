/**
 * Form 实例的各种方法
 */

function execFormMethod(formName, methodName, ...arg) {
  const form = this.$refs[formName];

  console.log(form, this, 'formformform');
  return form && form[methodName](...arg);
}

export default {
  methods: {
    validate(formName, ...arg) {
      return execFormMethod.call(this, formName, 'validate', ...arg);
    },
    validateField(formName, ...arg) {
      return execFormMethod.call(this, formName, 'validateField', ...arg);
    },
    resetFields(formName, ...arg) {
      this.$nextTick(() => {
        execFormMethod.call(this, formName, 'resetFields', ...arg);
      });
    },
    clearValidate(formName, ...arg) {
      this.$nextTick(() => {
        execFormMethod.call(this, formName, 'clearValidate', ...arg);
      });
    },
    validateSomeFields(formName, fields = []) {
      return new Promise(resolve => {
        const isPassArr = [];
        this.validateField(formName, fields, errorMsg => {
          isPassArr.push(!errorMsg);
          if (isPassArr.length === fields.length) {
            resolve(isPassArr.some(v => v));
          }
        });
      });
    },
  },
};
