<template>
  <div class='dataView' :class='{floatRight : isScale}'>
    <div class="scaleBtn" @click='isScale = !isScale'>
      <img v-if='!isScale' :src="require('@/assets/rightarrow.png')">
      <img v-else :src="require('@/assets/rightarrow2.png')">
    </div>
    <div class='imgView' v-show='!isScale && !curComponent && !curPage'>
      <img class='img' :src="require('@/assets/nodata.png')" />
      <div class='imgt'>暂无数据去探索吧</div>
    </div>
    <!-- 组件设置属性 -->
    <div class='dataForm' v-show='curComponent && !isScale'>
      <Tabs :activeKey='activeKey' @change='changeTabs'>
        <TabPane tab="外观" key='1'>
          <styleData />
        </TabPane>
        <TabPane tab="事件" key='2'></TabPane>
      </Tabs>
    </div>
    <!-- 页面设置属性 -->
    <div class='pageForm' v-show='!curComponent && curPage && !isScale'>
      <pageData />
    </div>
  </div>
</template>
<script>
import {
  Tabs,
} from 'ant-design-vue';
import { mapState } from 'vuex';
import styleData from './styleData.vue';
import pageData from './pageData.vue';

const { TabPane } = Tabs;
export default {
  name: 'dataView',
  components: {
    Tabs,
    TabPane,
    styleData,
    pageData,
  },
  data() {
    return {
      isScale: false,
      activeKey: '1',
      activeAttr: ['1', '2', '3', '4', '5', '6'],
      form: {
        color: '#000000'
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
  computed: {
    ...mapState({
      curComponent: (state) => state.components.curComponent,
      curPage: (state) => state.pageSetting.curPage,
    }),
  },
  watch: {},
  methods: {
    changeTabs(key) {
      this.activeKey = key;
    }
  },
};

</script>
<style lang="less" scoped>
.floatRight {
  width: 0px !important;
}

.floatLeft {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.dataView {
  width: 300px;
  // padding: 20px;
  z-index: 1;
  position: fixed;
  right: 0px;
  height: 100%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);

  .scaleBtn {
    height: 80px;
    width: 20px;
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: -2px 0 4px 0 rgb(0 0 0 / 10%);
    background: #fff;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin-left: 3px;
      width: 18px;
    }
  }

  .imgView {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .img {
      margin-bottom: 48%;
      width: 90%;
    }

    .imgt {
      color: #666;
      font-size: 16px;
      position: absolute;
      margin-top: 80%;
    }
  }

}

// tabs
/deep/ .ant-tabs-bar {
  margin: 0;
}

/deep/ .ant-tabs-nav-wrap {
  display: flex;
}

/deep/ .ant-tabs-tab {
  margin: 0 12px;
  padding: 12px 0px;
}

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

// from
/deep/ .ant-form label {
  font-size: 12px;
  color: rgb(65, 80, 88);
}

// input
/deep/ .ant-input {
  border-radius: 0px;
  font-size: 12px;
}

// nums
/deep/ .ant-input-number {
  border-radius: 0px;
}

/deep/ .ant-input-number-sm input {
  font-size: 12px;
}

// select
/deep/ .ant-select-sm {
  font-size: 12px;
}

// formitem
/deep/ .ant-form-item {
  margin-bottom: 12px;
}

// colorPicker

/deep/ .el-color-picker {
  display: flex;
  align-items: center;
}

/deep/ .el-color-dropdown__btns {
  display: flex;
  align-items: center;
}

/deep/ .el-color-picker__trigger {
  width: 25px;
  height: 25px;
}

// fromitem
/deep/ .ant-form-item-control {
  text-align: left;
}

// radio
/deep/ .ant-radio-button-wrapper:first-child {
  border-radius: 0px;
}

/deep/ .ant-radio-button-wrapper:last-child {
  border-radius: 0px;
}

/deep/ .ant-select-selection {
  border-radius: 0px;
}

</style>
