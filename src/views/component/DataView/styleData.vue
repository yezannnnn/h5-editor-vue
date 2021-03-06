<template>
  <Collapse :activeKey='activeAttr' expandIconPosition='right' :bordered='false'>
    <CollapsePanel key='1' header="坐标及宽高">
      <areaForm />
    </CollapsePanel>
    <CollapsePanel key='2' header="文本" v-if='curComponent && curComponent.name === "TextView"'>
      <textForm label='文本内容' />
    </CollapsePanel>
    <CollapsePanel key='3' header="图片" v-if='curComponent && curComponent.name === "ImageView"'>
      <textForm label='图片Url' mode='textarea' />
    </CollapsePanel>
    <CollapsePanel key='4' header="字体" v-if='curComponent && curComponent.props.font'>
      <fontForm />
    </CollapsePanel>
  </Collapse>
</template>
<script>
import { mapState } from 'vuex';
import { Collapse } from 'ant-design-vue';
import areaForm from './components/areaForm.vue';
import textForm from './components/textForm.vue';
import fontForm from './components/fontForm.vue';

const CollapsePanel = Collapse.Panel;
export default {
  name: 'styleData',
  components: {
    areaForm,
    textForm,
    fontForm,
    Collapse,
    CollapsePanel,
  },
  data() {
    return {
      activeAttr: ['1', '2', '3', '4', '5', '6'],
    };
  },
  methods: {},
  computed: {
    ...mapState({
      curComponent: (state) => state.components.curComponent,
    }),
  }
};

</script>
<style lang="less">
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

</style>
