<script>
import Vue from 'vue';
export default Vue.component('a-input', {
  props: ['value'],
  render(createElement) {
    return createElement(
      'el-input',
      {
        props: { ...this.$props },
        class: 'a-input',
        attrs: { ...this.$attrs },
        on: {
          input: v => {
            this.$emit('input', v);
          },
        },
      },
      this.$slots.default,
    );
  },
});
</script>
