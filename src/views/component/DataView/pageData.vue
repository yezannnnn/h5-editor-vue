<template>
  <div>
    <div class="p_h">页面设置</div>
    <Collapse :activeKey='activeAttr' expandIconPosition='right' :bordered='false'>
      <CollapsePanel key='1' header="坐标及宽高">
        <arow type='flex' justify="space-around" style='margin-bottom: 12px;'>
          <acol :span='8'>
            <InputNumber disabled :formatter="value => `W ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                         :parser="value => value.replace(/W\s?|(,*)/g, '')" v-model='pageSetting.width' size="small"
                         style='width: 90%'/>
          </acol>
          <acol :span='8'>
            <InputNumber :formatter="value => `H ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                         :parser="value => value.replace(/\H\s?|(,*)/g, '')" v-model='pageSetting.height' size="small"
                         style='width: 90%'/>
          </acol>
          <acol :span='8'></acol>
        </arow>
      </CollapsePanel>
      <CollapsePanel key='2' header="页面标题">
        <FormModel :model='form' labelAlign='left'>
          <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='标题'>
            <Input size='small' placeholder='请输入标题' v-model='pageSetting.title'/>
          </FormModelItem>
        </FormModel>
      </CollapsePanel>
      <CollapsePanel key='3' header="背景图">
        <FormModel :model='form' labelAlign='left'>
          <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='Url'>
            <Input type='textarea' size='small' v-model='pageSetting.background' placeholder='请输入在线Url（目前只支持网络图片）'
                   @change='getImageInfo'/>
          </FormModelItem>
          <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='背景色'>
            <el-color-picker v-model='pageSetting.backgroundColor'></el-color-picker>
          </FormModelItem>
        </FormModel>
      </CollapsePanel>
    </Collapse>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  Collapse,
  FormModel,
  Input,
  InputNumber,
  Col as acol,
  Row as arow,
} from 'ant-design-vue';

const CollapsePanel = Collapse.Panel;
const FormModelItem = FormModel.Item;
export default {
  name: 'pageData',
  components: {
    InputNumber,
    acol,
    arow,
    Collapse,
    CollapsePanel,
    FormModel,
    Input,
    FormModelItem,
  },
  data() {
    return {
      activeAttr: ['1', '2', '3', '4', '5'],
      form: {},
    };
  },
  methods: {
    async getImageInfo(e) {
      const that = this;
      const img = new Image();
      img.src = e.currentTarget.value;
      img.onload = function () {
        const ratio = Math.floor(img.width / 375);
        const height = Math.floor(img.height / ratio);

        const data = { ...that.pageSetting };
        data.height = height;
        that.$store.commit('pageSetting/setPageSetting', data);
      };
      img.onerror = () => {
        console.log('图片渲染失败！');
      };
    }
  },
  computed: {
    ...mapState({
      curComponent: (state) => state.components.curComponent,
      curPage: (state) => state.pageSetting.curPage,
      pageSetting: (state) => state.pageSetting.pageSetting,
    }),
  }
};

</script>
<style lang="less" scoped>
// co
/deep/ .ant-collapse {
  background: none;

  .ant-collapse-header {
    font-size: 12px;
    font-weight: 600;
    color: rgb(65, 80, 88);
    line-height: 20px;
    text-align: left !important;
  }
}

.p_h {
  text-align: left;
  font-weight: bold;
  padding: 16px;
  border-bottom: 1px solid #d9d9d9;
}

</style>
