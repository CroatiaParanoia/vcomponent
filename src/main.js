import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Object.values(ElementUI).forEach((component) => {
  Vue.component(component.name, component);
});

new Vue({
  el: '#app',
  render: (h) => h(App),
});
