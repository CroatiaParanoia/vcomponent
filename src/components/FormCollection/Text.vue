<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
};
</script>
<template>
  <span class="form-item__text">{{ text }}</span>
</template>
