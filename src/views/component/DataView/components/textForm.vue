<template>
  <FormModel :model='form' labelAlign='left'>
    <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='文本内容'>
      <Input size='small' v-model="curComponent && curComponent.props.text" />
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
  data() {
    return {
      form: {}
    };
  },
  computed: {
    ...mapState(['curComponent'])
  },
  methods: {},

};

</script>
<style lang="less">
</style>
