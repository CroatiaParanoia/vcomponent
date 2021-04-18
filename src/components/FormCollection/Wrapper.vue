<script>
export default {
  name: 'Wrapper',
};
</script>

<template>
  <div class="form-item__wrapper"><slot /></div>
</template>

<style scoped>
.form-item__wrapper {
  display: flex;
}

.form-item__wrapper > * {
  margin-right: 12px;
}
</style>
