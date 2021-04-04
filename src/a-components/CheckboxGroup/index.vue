<template>
  <el-checkbox-group v-model="value">
    <el-checkbox
      v-for="item in options"
      :label="item.label"
      :key="item.value"
      :name="item.value"
      :disabled="item.disabled"
    ></el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'a-checkbox-group',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
