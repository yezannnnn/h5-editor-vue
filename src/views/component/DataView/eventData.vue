<template>
  <Collapse class="eventData" :activeKey='activeAttr' expandIconPosition='right' :bordered='false' style='max-height: 90vh;overflow: scroll;'>
    <CollapsePanel key='1' header="跳转链接">
      <FormModel :model='form' labelAlign='left'>
        <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='链接地址'>
          <ATextArea :placeholder="placeholderText" v-model='curComponent && curComponent.event.click.link' allow-clear />
        </FormModelItem>
        <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='跳转类型'>
          <RadioGroup default-value="left" button-style="solid" size='small' v-model='curComponent && curComponent.event.click.linkType' @change="switchLink">
            <RadioButton value="local" title='内部链接'>
              内链
            </RadioButton>
            <RadioButton value="fullpath" title='外部链接'>
              外链
            </RadioButton>
            <RadioButton value="native" title='APP链接'>
              APP
            </RadioButton>
            <RadioButton value="null" title='维护链接点击会提示'>
              维护
            </RadioButton>
          </RadioGroup>
        </FormModelItem>
      </FormModel>
    </CollapsePanel>
    <CollapsePanel key='2' header="弹窗显示">
      <!-- <a-textarea placeholder="textarea with clear icon" allow-clear /> -->
    </CollapsePanel>
    <CollapsePanel key='3' header="自定义逻辑">
      <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='脚本'>
        <ATextArea placeholder="额外代码逻辑（js）" v-model='curComponent && curComponent.event.extra' allow-clear />
      </FormModelItem>
    </CollapsePanel>
  </Collapse>
</template>
<script>
import { mapState } from 'vuex';
import { Collapse, FormModel, Input, Radio } from 'ant-design-vue';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const FormModelItem = FormModel.Item;
const CollapsePanel = Collapse.Panel;
const ATextArea = Input.TextArea;
export default {
  name: 'styleData',
  components: {
    Collapse,
    CollapsePanel,
    ATextArea,
    FormModelItem,
    RadioGroup,
    RadioButton
  },
  data() {
    return {
      form: {},
      activeAttr: ['1', '2', '3', '4', '5', '6'],
      placeholderText: '填写内部链接支持{this.$store.state.merchantAppid}',
    };
  },
  methods: {
    switchLink() {
      switch (this.curComponent.event.click.linkType) {
        case 'local':
          this.placeholderText = '填写内部链接支持{this.$store.state.merchantAppid}';
          break;
        case 'native':
          this.placeholderText = '填写APP跳转链接';
          break;
        case 'fullpath':
          this.placeholderText = '填写外部链接带http、https';
          break;
        case 'null':
          this.placeholderText = '填写维护提示语';
          break;
        default:
          this.placeholderText = '填写内部链接支持{this.$store.state.merchantAppid}';
          break;
      }
    },
  },
  computed: {
    ...mapState({
      curComponent: (state) => state.components.curComponent,
    }),
  }
};

</script>
<style lang="less" >
.eventData .ant-form-item label{
  font-size: 12px;
}
.eventData .ant-form-item-label{
  text-align: left;
}
// fromitem
.eventData .ant-form-item-control {
  text-align: left;
}

// radio
.eventData .ant-radio-button-wrapper:first-child {
  border-radius: 0px;
}

.eventData .ant-radio-button-wrapper:last-child {
  border-radius: 0px;
}

.eventData .ant-select-selection {
  border-radius: 0px;
}
// co
.eventData .ant-collapse {
  background: none;

  .ant-collapse-header {
    font-size: 12px;
    font-weight: 600;
    color: rgb(65, 80, 88);
    line-height: 20px;
    text-align: left !important;
  }
}

// from
.eventData .ant-form label {
  font-size: 12px;
  color: rgb(65, 80, 88);
}

// input
.eventData .ant-input {
  border-radius: 0px;
  font-size: 12px;
}
</style>
