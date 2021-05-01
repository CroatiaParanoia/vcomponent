import AddressCascader from './../components/AddressCascader';

export default {
  title: 'Example/AddressCascader',
  component: AddressCascader,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AddressCascader },
  template: `<AddressCascader />`,
});

export const Default = Template.bind({});

Default.args = {};
