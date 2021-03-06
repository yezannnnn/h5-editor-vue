<template>
  <div @contextmenu='handleContextmenu'>
    <div class="pageBtns" @click='selectPage' :class='{active:curPage}'>
      页面设置
    </div>
    <div class="canvas">
      <div class='sourceBox' id='sourceBox' :style='getBackgroundStyle()' @drop="handleDrop" @dragover.prevent>
        <Shape v-for='(item,index) in sourceComponents' :style="getShapeStyle(item)" :key='index' :dom='item' :active='item === curComponent'>
          <DynamiComponent :currentComp='item.component' :propsOption='item.props' />
        </Shape>
        <ContextMenu />
      </div>
    </div>
    <div class="bottomBtns">
      容器高度：{{ this.pageSetting.height > 664 ? this.pageSetting.height + '（可滚动）' : this.pageSetting.height }}
    </div>
    <!-- 右键菜单 -->
  </div>
</template>
<script>
// 异步加载组件
import { mapState } from 'vuex';
import DynamiComponent from '@/components/DynamiComponent/DynamiComponent.vue';
import Shape from '@/components/Shape/Shape.vue';
import ContextMenu from '@/components/ContextMenu/ContextMenu.vue';
import { deepCopy } from '@/utils/utils';

export default {
  name: 'sourceBox',
  components: {
    DynamiComponent,
    Shape,
    ContextMenu,
  },
  data() {
    return {
      sourceComponents: this.$store.getters.sourceData,
      boxX: 0,
      boxY: 0,
      start: { // 选中区域的起点
        x: 0,
        y: 0,
      },
      styles: {},
    };
  },
  computed: {
    ...mapState({
      curComponent: (state) => state.components.curComponent,
      curPage: (state) => state.pageSetting.curPage,
      pageSetting: (state) => state.pageSetting.pageSetting,
    }),
  },
  methods: {
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const comp = deepCopy(this.$store.getters.baseComponentData[e.dataTransfer.getData('index')]);
      comp.top = e.offsetY - e.dataTransfer.getData('offsetY');
      comp.left = e.offsetX - e.dataTransfer.getData('offsetX');
      comp.width = e.dataTransfer.getData('clientWidth');
      comp.height = e.dataTransfer.getData('clientHeight');
      comp.rotate = 0;
      comp.id = new Date().getTime();
      this.$store.commit('sourceData/addSourceData', comp);
    },
    handleDragOver() {},
    handleMouseDown(e, index) {
      const component = this.sourceComponents[index];
      const pos = {};
      e.stopPropagation();

      this.$store.commit('components/setComponentStatus', 'drop');
      this.$store.commit('components/setCurComponent', component);
      this.$store.commit('pageSetting/clearCurPage');

      const startY = e.clientY;
      const startX = e.clientX;
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = Number(component.top);
      const startLeft = Number(component.left);

      const move = (moveEvent) => {
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        pos.top = currY - startY + startTop;
        pos.left = currX - startX + startLeft;
        // 修改当前组件样式
        this.$store.commit('components/setShapeStyle', pos);
      };

      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },
    handleMouseMove() {},
    handleMouseUp() {},
    getShapeStyle(style) {
      const result = {};
      ['width', 'height', 'top', 'left', 'rotate'].forEach((attr) => {
        if (attr !== 'rotate') {
          result[attr] = style[attr] + 'px';
        } else {
          result.transform = 'rotate(' + style[attr] + 'deg)';
        }
      });
      result.position = style.position;
      return result;
    },
    selectPage() {
      // this.$store.dispatch('pageSetting/selectPage');
      this.$store.commit('pageSetting/selectPage');
      this.$store.commit('components/clearCurComponent');
      this.$store.commit('components/setComponentStatus', null);
    },
    // 获取样式方法
    getBackgroundStyle() {
      const styles = {};
      if (!this.pageSetting.backgroundUrl) {
        styles.background = this.pageSetting.backgroundColor;
      } else {
        styles.background = `url(${this.pageSetting.backgroundUrl})`;
        styles.backgroundSize = this.pageSetting.backgroundSize;
        styles.backgroundRepeat = this.pageSetting.backgroundRepeat;
        styles.backgroundPosition = this.pageSetting.backgroundPosition;
      }
      ['width', 'height'].forEach((attr) => {
        styles[attr] = this.pageSetting[attr] + 'px';
      });
      return styles;
    },
    // 右键菜单
    handleContextmenu(e) {
      e.stopPropagation();
      e.preventDefault();
      let { target, offsetY: top, offsetX: left } = e;
      while (target instanceof SVGElement) {
        debugger;
        target = target.parentNode;
      }
      console.log(e);
      while (!target.className.includes('sourceBox')) {
        left += target.offsetLeft;
        top += target.offsetTop;
        target = target.parentNode;
      }
      // console.log('e======>', e);
      // const top = e.pageY - e.layerY;
      // const left = e.pageX - e.layerX;
      this.$store.commit('components/setComponentStatus', 'click');
      this.$store.commit('contextMenu/showContextMenu', { top, left });
    },
  },
  created() {
    this.sourceComponents.forEach((item) => {
      item.component = () => import('@/components/' + item.type + '/' + item.name + '/' + item.name + '.vue');
    });
  },
  mounted() {
    this.getBackgroundStyle();
  },
};

</script>
<style lang="less" scoped>
.pageBtns {
  height: 30px;
  width: 120px;
  position: absolute;
  top: 60px;
  margin-left: -60px;
  left: 487.5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: rgb(65, 80, 88);
}

.bottomBtns {
  height: 30px;
  width: 120px;
  position: absolute;
  top: 770px;
  margin-left: -60px;
  left: 487.5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #C0C4CC;
}

.pageBtns:hover,
.active {
  // background: #fff;
  color: #40a9ff;
  font-weight: bold;
  box-shadow: 0 0 0 1px #40a9ff;
}

.canvas {
  width: 375px;
  transition: transform .3s ease-out;
  // overflow-x: hidden;
  overflow-y: scroll;
  height: 664px;
  left: 300px;
  top: 100px;
  box-shadow: -2px 0 4px 0 rgb(0 0 0 / 10%);
  position: absolute;
}

.sourceBox {
  background-color: #fff;
}

</style>
