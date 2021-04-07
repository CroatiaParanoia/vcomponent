<script>
import Vue from 'vue';
export default Vue.component('a-text', {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
});
</script>
<template>
  <span class="a-form-item__text">{{ text }}</span>
</template>
