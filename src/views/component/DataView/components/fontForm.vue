<template>
  <FormModel :model='form' labelAlign='left'>
    <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='字体大小'>
      <InputNumber size="small" :default-value="14" :max='100' :min='12' v-model='curComponent && curComponent.props.font.fontSize'></InputNumber>
    </FormModelItem>
    <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='颜色'>
      <colorPicker v-model='curComponent && curComponent.props.font.color'></colorPicker>
    </FormModelItem>
    <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='字体粗细'>
      <!-- <InputNumber size="small" :default-value="form.weight" step='100' :max='800' :min='100'></InputNumber> -->
      <Select size='small' :default-value="400" v-model='curComponent && curComponent.props.font.fontWeight'>
        <SelectOption :value="400">标准</SelectOption>
        <SelectOption :value='800'>粗体</SelectOption>
      </Select>
    </FormModelItem>
    <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='文本对齐'>
      <RadioGroup default-value="left" button-style="solid" size='small' v-model='curComponent && curComponent.props.font.justifyContent'>
        <RadioButton value="flex-start">
          <aicon type="align-left" />
        </RadioButton>
        <RadioButton value="center">
          <aicon type="align-center" />
        </RadioButton>
        <RadioButton value="flex-end">
          <aicon type="align-right" />
        </RadioButton>
      </RadioGroup>
      <RadioGroup style='margin-left: 35px;' default-value="middle" button-style="solid" size='small' v-model='curComponent && curComponent.props.font.alignItems'>
        <RadioButton value="flex-start">
          <aicon type="vertical-align-top" />
        </RadioButton>
        <RadioButton value="center">
          <aicon type="vertical-align-middle" />
        </RadioButton>
        <RadioButton value="flex-end">
          <aicon type="vertical-align-bottom" />
        </RadioButton>
      </RadioGroup>
    </FormModelItem>
  </FormModel>
</template>
<script>
import { mapState } from 'vuex';
import {
  FormModel,
  Radio,
  Icon as aicon,
  Select,
  InputNumber,
} from 'ant-design-vue';

const FormModelItem = FormModel.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const SelectOption = Select.Option;
export default {
  name: 'fontForm',
  components: {
    FormModelItem,
    FormModel,
    RadioButton,
    RadioGroup,
    aicon,
    Select,
    SelectOption,
    InputNumber,
  },
  data() {
    return {
      form: {}
    };
  },
  computed: {
    ...mapState({
      curComponent: (state) => state.components.curComponent,
    }),
  },
  methods: {},
};

</script>
<style lang="less">
</style>
