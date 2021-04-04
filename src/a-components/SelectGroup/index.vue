<template>
  <el-select
    :value="innerValue"
    @input="handleValueChange"
    :placeholder="placeholder"
  >
    <el-option
      v-for="item in options"
      :label="item.label"
      :key="item.value"
      :name="item.value"
      :value="item.value"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</template>

<script>
import Vue from 'vue';
export default Vue.component('a-select-group', {
  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    innerValue() {
      return this.value;
    },
  },
  methods: {
    handleValueChange(v) {
      this.$emit('input', v);
    },
  },
});
</script>

<style scoped></style>
