import Text from './Text.vue';
import Wrapper from './Wrapper.vue';

const formMapping = {
  Text,
  Wrapper,
  Slot: 'Slot',
};

export const setFormMapping = (newFormMapping) => {
  Object.assign(formMapping, newFormMapping);
};

export const getFormElementByName = (name) => {
  return formMapping[name];
};
