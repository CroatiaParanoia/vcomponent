  <script>
import AddressWorker from './address.worker.js';

import addressJson from './cities.json';
export default {
  inheritAttrs: false,
  data() {
    return { countryList: [], stateList: [], cityList: [], countryValue: '', stateValue: '', cityValue: '' };
  },
  created() {
    this.initWorker();
  },
  mounted() {
    this.queryAddressByCode().then((res) => {
      this.countryList = res;
    });
  },

  methods: {
    initWorker() {
      const worker = new AddressWorker();

      worker.postMessage({ type: 'init', payload: { addressList: JSON.parse(JSON.stringify(addressJson)) } });

      this.worker = worker;
    },

    queryCities(keywords) {
      return new Promise((resolve) => {
        this.worker.addEventListener(
          'message',
          ({ data }) => {
            resolve(data.payload);
          },
          { once: true },
        );

        this.worker.postMessage({
          type: 'queryCities',
          payload: {
            keywords,
          },
        });
      });
    },

    queryAddressByCode(countryValue, stateValue) {
      return new Promise((resolve) => {
        this.worker.addEventListener(
          'message',
          ({ data }) => {
            resolve(data.payload);
          },
          { once: true },
        );
        this.worker.postMessage({
          type: 'queryAddressByCode',
          payload: {
            countryValue,
            stateValue,
          },
        });
      });
    },
    handleCountryChange(countryValue) {
      this.stateValue = '';
      this.cityValue = '';
      this.queryAddressByCode(countryValue).then((res) => {
        this.stateList = res;
      });
    },
    handleStateChange(stateValue) {
      this.cityValue = '';
      this.queryAddressByCode(this.countryValue, stateValue).then((res) => {
        this.cityList = res;
      });
    },
  },

  unmount() {
    this.worker.terminate();
  },
};
</script>


<template>
  <div class="address-cascader__container">
    <el-select
      v-model="countryValue"
      filterable
      style="width: 140px"
      placeholder="请选择国家"
      @change="handleCountryChange"
    >
      <el-option v-for="item in countryList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select
      v-model="stateValue"
      filterable
      style="width: 140px"
      placeholder="请选择省/州"
      @change="handleStateChange"
    >
      <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select v-model="cityValue" filterable style="width: 140px" placeholder="请选择城市">
      <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>

<style scoped>
</style>