<template>
  <span class="a-form-item__text">{{ value }}</span>
</template>

<script>
import Vue from 'vue';
export default Vue.component('a-text', {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
});
</script>
