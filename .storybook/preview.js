import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

console.log(ElementUI, 'elementUI');

Object.values(ElementUI).forEach((component) => {
  if (typeof component === 'object' && component.name) {
    Vue.component(component.name, component);
  }
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
