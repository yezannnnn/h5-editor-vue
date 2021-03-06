<template>
  <FormModel :model='form' labelAlign='left'>
    <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' :label='label'>
      <Input v-if='mode === "text"' type="text" size='small' v-model="curComponent && curComponent.props.text" placeholder='请输入文本内容' />
      <Input v-else type='textarea' size='small' v-model="curComponent && curComponent.props.src" placeholder='请输入在线Url（目前只支持网络图片）' />
    </FormModelItem>
  </FormModel>
</template>
<script>
import { mapState } from 'vuex';
import { FormModel, Input } from 'ant-design-vue';

const FormModelItem = FormModel.Item;
export default {
  name: 'textForm',
  components: {
    FormModelItem,
    FormModel,
    Input,
  },
  props: {
    mode: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: '值'
    }
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
