import FormCollection, { FormItems, FormItem, updateOptions } from './../components/FormCollection';

export default {
  title: 'Example/FormCollection',
  component: FormCollection,
};

const formMapping = {
  Input: 'el-input',
  Select: 'el-select',
};

FormCollection.provide({ formMapping });

const options = [
  {
    element: 'Input',
    config: { placeholder: '请输入公司名称', maxlength: 13 },
    name: 'companyName',
    rules: [],
    label: '公司名称',
    $format: (v) => v.toUpperCase(),
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
    content: [
      {
        element: 'Input',
        style: 'width: 120px',
        config: { placeholder: '请输入公司名称2' },
        name: 'companyName2',
        rules: [{ required: true, message: '请输入公司名称2' }],
        $format: (v) => v.toUpperCase(),
      },
      {
        element: 'Text',
        config: { text: '到这里' },
        $sourceKey: 'text',
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
    element: 'Wrapper',
    label: '算算',
    content: [
      {
        element: 'Input',
        style: 'width: 120px',
        config: { placeholder: '参数1' },
        name: 'add1',
        rules: [{ required: true, message: '请输入参数1' }],
        $format: (v) => v.toUpperCase(),
      },
      {
        element: 'Text',
        config: { text: '+' },
      },
      {
        element: 'Input',
        style: 'width: 120px',
        config: { placeholder: '参数2' },
        name: 'add2',
        rules: [{ required: true, message: '请输入参数2' }],
      },
      {
        element: 'Text',
        config: { text: '=' },
      },
      {
        element: 'Text',
        config: { text: '' },
        $sourceKey: 'text',
        $format: (_, dataSource) => {
          console.log(dataSource, 'dataSource');
          const value = (Number(dataSource.add1) || 0) + (Number(dataSource.add2) || 0);
          return String(value);
        },
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

    <el-button @click="handleOutput">
      输出
    </el-button>

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
        companyName: 'a',
        address: '',
        companyName2: '',
        companyName3: '',
        add1: '',
        add2: '',
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
  methods: {
    handleOutput() {
      console.log(this.dataSource, 'dataSource');
    },
  },
});

export const DemoForFormCollection = Template.bind({});

DemoForFormCollection.args = {
  options,
  labelWidth: '120px',
  labelPosition: 'right',
};

const personInfo = [
  {
    element: 'Input',
    label: '姓名',
    config: { placeholder: '输入姓名' },
    name: 'name',
  },
  {
    element: 'Input',
    label: '年龄',
    config: { placeholder: '输入年龄' },
    name: 'age',
  },
  {
    element: 'Slot',
    label: 'Slot插入值',
    name: 'slotValue',
  },
];
const enterpriseInfo = [
  {
    element: 'Input',
    label: '企业名称',
    config: { placeholder: '输入企业名称' },
    name: 'companyName',
  },
  {
    element: 'Input',
    label: '企业地址',
    config: { placeholder: '输入企业地址' },
    name: 'address',
  },
];

const Template2 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FormItems },
  template: `
  <div>
    <el-form v-bind="$props">
      个人信息
      <div style="width: 100%; height: 2px; background: #000" />
      <FormItems :dataSource="dataSource" :options="personInfo">
        <div slot="slotValue">
          通过Slot 来自定义vnode片段: 
          {{ dataSource.age }}
        </div> 
      </FormItems>

      企业信息
      <div style="width: 100%; height: 2px; background: #000" />
      <FormItems :dataSource="dataSource" :options="enterpriseInfo">
      </FormItems>
    </el-form>

    <el-button @click="handleOutput">
      输出
    </el-button>

    ** 你可以在下面的 **Controls** 面板进行对 props 的修改， 然后观看视图变更。
    <br />

    <div style="display: flex">
    
      <div style="flex: 1">
        input.personInfo:
        <pre>{{ personInfo }}</pre>
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
        companyName: 'a',
        address: '',
        age: '',
        name: '',
      },
    };
  },
  methods: {
    handleOutput() {
      console.log(this.dataSource, 'dataSource');
    },
  },
});

export const DemoForFormItems = Template2.bind({});

DemoForFormItems.args = {
  personInfo,
  enterpriseInfo,
  labelWidth: '120px',
  labelPosition: 'right',
};

const Template3 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FormItem },
  template: `
  <div>
    <el-form v-bind="$props">

      <FormItem :template="template">
        <div>
          通过Slot default 来自定义vnode片段
        </div> 

        <div slot="slotValue">
          通过 slotValue 来自定义vnode片段
        </div> 
      </FormItem>
      <FormItem :template="template">
        <div slot="slotValue">
          通过 slotValue 来自定义vnode片段
        </div> 
      </FormItem>

    </el-form>

    <el-button @click="handleOutput">
      输出
    </el-button>

    ** 你可以在下面的 **Controls** 面板进行对 props 的修改， 然后观看视图变更。
    <br />

    <div style="display: flex">
    
      <div style="flex: 1">
        input.template:
        <pre>{{ template }}</pre>
      </div>
      <div style="flex: 1">
        output:
      </div>
    </div>
  </div>`,
  data() {
    return {
      dataSource: {
        companyName: 'a',
        address: '',
        age: '',
        name: '',
      },
    };
  },
  methods: {
    handleOutput() {
      console.log(this.dataSource, 'dataSource');
    },
  },
});

export const DemoForFormItem = Template3.bind({});

DemoForFormItem.args = {
  template: personInfo[2],
  labelWidth: '120px',
  labelPosition: 'right',
};
