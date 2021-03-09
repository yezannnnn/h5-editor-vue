<template>
  <FormModel :model='form' labelAlign='left'>
    <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='圆角'>
      <aswitch style='margin-right: 20px;' checked-children="圆形" un-checked-children="圆角" :checked='curComponent && curComponent.props.looks.isYuan' @change='changeSwitch'></aswitch>
      <InputNumber v-if='curComponent && !curComponent.props.looks.isYuan' size="small" :default-value="0" :max='100' :min='0' v-model='curComponent && curComponent.props.looks.borderRadius'></InputNumber>
    </FormModelItem>
    <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='背景填充'>
      <el-color-picker v-model='curComponent && curComponent.props.looks.background'></el-color-picker>
    </FormModelItem>
    <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='描边'>
      <InputNumber size="small" :default-value="1" :max='100' :min='0' v-model='curComponent && curComponent.props.looks.borderWidth'></InputNumber>
      <Select size='small' :default-value="400" v-model='curComponent && curComponent.props.looks.borderStyle'>
        <SelectOption value="solid">实线</SelectOption>
        <SelectOption value='dashed'>虚线</SelectOption>
      </Select>
    </FormModelItem>
    <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='描边颜色'>
      <div class='borderColor'>
        <el-color-picker v-model='curComponent && curComponent.props.looks.borderColor'></el-color-picker>
      </div>
    </FormModelItem>
    <!--  <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='文本对齐'>
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
    </FormModelItem> -->
  </FormModel>
</template>
<script>
import { mapState } from 'vuex';
import {
  FormModel,
  Select,
  InputNumber,
  Switch as aswitch
} from 'ant-design-vue';

const FormModelItem = FormModel.Item;
const SelectOption = Select.Option;
export default {
  name: 'fontForm',
  components: {
    FormModelItem,
    FormModel,
    Select,
    SelectOption,
    InputNumber,
    aswitch,
  },

  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapState({
      curComponent: (state) => state.components.curComponent,
    }),
  },
  methods: {
    changeSwitch(value) {
      this.curComponent.props.looks.isYuan = value;
    }
  },
};

</script>
<style lang="less">
.borderColor /deep/ .m-colorPicker .box {
  margin-top: -260px;
}

</style>
