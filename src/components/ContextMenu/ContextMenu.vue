<template>
  <div class="contextmenu" v-show="menuShow && curStatus === 'click'" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
    <ul @mouseup="handleMouseUp">
      <template v-if="curComponent">
        <template>
          <li @click="deleteComponent">删除</li>
          <li @click="copyComponent">复制</li>
          <li @click="topComponent">置顶</li>
          <li @click="bottomComponent">置底</li>
        </template>
      </template>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { Message } from 'ant-design-vue';

export default {
  data() {
    return {
      copyData: null,
    };
  },
  computed: mapState({
    menuTop: (state) => state.contextMenu.menuTop,
    menuLeft: (state) => state.contextMenu.menuLeft,
    menuShow: (state) => state.contextMenu.menuShow,
    curComponent: (state) => state.components.curComponent,
    curStatus: (state) => state.components.curStatus,
  }),
  watch: {
    menuShow(newv) {
      // 当右键菜单消失 位置 0
      if (!newv) {
        this.menuLeft = 0;
        this.menuTop = 0;
      }
    }
  },
  methods: {
    lock() {
      this.$store.commit('lock');
    },

    unlock() {
      this.$store.commit('unlock');
    },

    // 点击菜单时不取消当前组件的选中状态
    handleMouseUp() {
      // this.$store.commit('setClickComponentStatus', true);
    },

    cut() {
      // this.$store.commit('cut');
    },

    copy() {
      // this.$store.commit('copy');
    },

    paste() {
      // this.$store.commit('paste', true);
      // this.$store.commit('recordSnapshot');
    },

    deleteComponent() {
      this.$store.commit('sourceData/delSourceData', this.curComponent.id);
      this.clickStatus();
      // this.$store.commit('recordSnapshot');
    },
    copyComponent() {
      this.$store.dispatch('sourceData/copyInSourceData', this.curComponent);
      this.clickStatus();
    },
    upComponent() {
      this.$store.dispatch('sourceData/upComponent');
      this.clickStatus();
    },

    downComponent() {
      this.$store.dispatch('sourceData/downComponent');
      this.clickStatus();
    },

    topComponent() {
      this.$store.dispatch('sourceData/topComponent', this.curComponent.id);
      this.clickStatus();
    },

    bottomComponent() {
      this.$store.dispatch('sourceData/bottomComponent', this.curComponent.id);
      this.clickStatus();
    },
    clickStatus() {
      this.$store.commit('contextMenu/hideContextMenu');
      this.$store.commit('components/setComponentStatus', null);
      this.$store.commit('components/clearCurComponent');
      Message.success('操作成功！');
    }
  },
};

</script>
<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
        color: #1890ff;
        font-weight: bold;
      }
    }
  }
}

</style>
