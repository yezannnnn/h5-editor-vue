<template>
  <div class='mediaBox'>
    <Tabs :defaultActiveKey='1' :activeKey='activeKey' @change='changeTabs'>
      <TabPane tab="基础组件" key='1'>
        <BaseComponents />
      </TabPane>
      <TabPane tab="媒体组件" key='2'>
        222
      </TabPane>
      <TabPane tab="自定义组件" key='3'>
        333
      </TabPane>
      <TabPane tab="图片链接" key='4'>
        444x
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { Tabs } from 'ant-design-vue';
import BaseComponents from '@/components/BaseComponents/index.vue';

const { TabPane } = Tabs;

export default {
  name: 'mediaBox',
  components: {
    Tabs,
    TabPane,
    BaseComponents
  },
  data() {
    return {
      activeKey: '1'
    };
  },
  methods: {
    changeTabs(key) {
      this.activeKey = key;
    },
  }
};
</script>
<style lang="less" scoped>
.mediaBox {
  width: 360px;
  padding: 16px;
  z-index: 1;
  position: fixed;
  left: 0px;
  height: 100%;
  background: #fff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, .2);
  user-select: none;

  .liItem {
    margin: 15px 0px;
    border: 1px solid #fff;
    background-color: transparent;
  }

  .liItem:hover {
    border: 1px solid blue;
  }

}

</style>
