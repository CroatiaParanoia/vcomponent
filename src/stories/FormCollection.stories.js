import FormCollection, { updateOptions } from './../components/FormCollection';

export default {
  title: 'Example/FormCollection',
  component: FormCollection,
};

const options = [
  {
    element: 'Input',
    config: { placeholder: '请输入公司名称', maxlength: 3 },
    name: 'companyName',
    rules: [],
    label: '公司名称',
  },
  {
    element: 'Select',
    config: { placeholder: '请选择地址', options: [] },
    name: 'address',
    rules: [{ required: true, message: '请选择地址' }],
    label: '地址',
  },
  {
    element: 'Wrapper',
    config: { placeholder: '多选几个' },
    rules: [],
    label: '公司地址',
    children: [
      {
        element: 'Input',
        style: 'width: 120px',
        config: { placeholder: '请输入公司名称2' },
        name: 'companyName2',
        rules: [{ required: true, message: '请输入公司名称2' }],
      },
      {
        element: 'Text',
        config: { value: '到这里' },
      },
      {
        element: 'Input',
        style: 'width: 120px',
        config: { placeholder: '请输入公司名称3' },
        name: 'companyName3',
        rules: [{ required: true, message: '请输入公司名称3' }],
      },
    ],
  },
  {
    element: 'Slot',
    label: '随便',
    name: 'suibian',
    config: {},
  },
];

const addressOptions = [
  {
    label: '地址1',
    value: 'address1',
  },
  {
    label: '地址2',
    value: 'address2',
  },
  {
    label: '地址3',
    value: 'address3',
  },
];

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FormCollection },
  template: `
  <div>
    <FormCollection  :dataSource="dataSource" v-bind="$props">
      <div slot="suibian">
        通过Slot 来自定义vnode片段: 
        {{ dataSource.companyName2 }}
      </div> 
    </FormCollection>

    ** 你可以在下面的 **Controls** 面板进行对 props 的修改， 然后观看视图变更。
    <br />

    <div style="display: flex">
    
      <div style="flex: 1">
        input:
        <pre>{{ options }}</pre>
      </div>
      <div style="flex: 1">
        output:
        <pre>{{ dataSource }}</pre>
      </div>
    </div>
  </div>`,
  data() {
    return {
      dataSource: {
        companyName: '',
        address: '',
        companyName2: '',
        companyName3: '',
      },
    };
  },
  mounted() {
    // 模拟异步请求数据, 并更新options
    //  (此处因为为了方便在controls 调试， 所以直接操控了 props， 日常开发中千万不要这样写！！！)
    setTimeout(() => {
      this.options = updateOptions(this.options, 'address', {
        config: { options: addressOptions },
      });
    }, 3000);
  },
});

export const Demo1 = Template.bind({});

Demo1.args = {
  options,
  labelWidth: '120px',
  labelPosition: 'right',
};
