<script>
import Vue from 'vue';

export default Vue.component('a-wrapper', {
  render(createElement) {
    return createElement(
      'div',
      { class: 'form-item__wrapper' },
      this.$slots.default,
    );
  },
});
</script>

<style scoped>
.form-item__wrapper {
  display: flex;
}

.form-item__wrapper > * {
  margin-right: 12px;
}
</style>
