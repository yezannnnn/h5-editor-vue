<template>
  <div @contextmenu='handleContextmenu'>
    <div class="pageBtns" @click='selectPage' :class='{active:curPage}'>
      页面设置
    </div>
    <div class="canvas">
      <div class='sourceBox' id='sourceBox' :style='getBackgroundStyle()' @drop="handleDrop" @dragover.prevent>
        <Shape v-for='(item,index) in sourceData' :style="getShapeStyle(item)" :key='index' :dom='item'
               :active='item === curComponent'>
          <DynamiComponent :currentComp='item.component' :propsOption='item.props'/>
        </Shape>
        <!-- 右键菜单 -->
        <ContextMenu/>
        <!-- 标线 -->
        <MakeLine/>
      </div>
      <!-- <div class="dropbtn" ref="dropDom"></div> -->
    </div>

    <!-- <div class="bottomBtns">
      容器高度：{{ this.pageSetting.height > 664 ? this.pageSetting.height + '（可滚动）' : this.pageSetting.height }}
    </div> -->
    <!-- 右键菜单 -->
  </div>
</template>
<script>
// 异步加载组件
import { mapState } from 'vuex';
import DynamiComponent from '@/components/DynamiComponent/DynamiComponent.vue';
import Shape from '@/components/Shape/Shape.vue';
import ContextMenu from '@/components/ContextMenu/ContextMenu.vue';
import MakeLine from '@/components/MakeLine/MakeLine.vue';
import { deepCopy } from '@/utils/utils';

export default {
  name: 'sourceBox',
  components: {
    DynamiComponent,
    Shape,
    ContextMenu,
    MakeLine,
  },
  data() {
    return {
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
      sourceData: (state) => state.sourceData.sourceData,
      curComponent: (state) => state.components.curComponent,
      curPage: (state) => state.pageSetting.curPage,
      pageSetting: (state) => state.pageSetting.pageSetting,
    }),
  },
  methods: {
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(e);
      const comp = deepCopy(this.$store.getters.baseComponentData[e.dataTransfer.getData('index')]);

      comp.top = e.offsetY - e.dataTransfer.getData('offsetY');
      comp.left = e.offsetX - e.dataTransfer.getData('offsetX');
      console.log(e.dataTransfer.getData('offsetY'));
      console.log(e.dataTransfer.getData('offsetX'));
      comp.width = parseInt(e.dataTransfer.getData('clientWidth'), 0);
      comp.height = parseInt(e.dataTransfer.getData('clientHeight'), 0);
      comp.rotate = 0;
      comp.id = new Date().getTime();
      this.$store.commit('sourceData/addSourceData', comp);
    },
    handleDragOver() {
    },
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
    handleMouseMove() {
    },
    handleMouseUp() {
    },
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
      if (!this.pageSetting.background) {
        styles.background = this.pageSetting.backgroundColor;
      } else {
        if (styles.background) {
          styles.background = styles.background.indexOf('url(') === 0 ? styles.background : `url(${this.pageSetting.background})`;
        } else {
          styles.background = `url(${this.pageSetting.background})`;
        }
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
      let {
        target,
        offsetY: top,
        offsetX: left
      } = e;
      while (target instanceof SVGElement) {
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
      this.$store.commit('contextMenu/showContextMenu', {
        top,
        left
      });
    },
    moveHandle(nowClient, dom) {
      let changeHight = nowClient - 103;
      let remainHight = document.body.clientHeight - nowClient;
      // 下面两个判断是控制拖动的最大范围，不能完全覆盖
      if (changeHight < 100) {
        changeHight = 100;
        nowClient = 100 + 103;
        remainHight = document.body.clientHeight - nowClient;
      }
      if (remainHight < 100) {
        remainHight = 100;
        nowClient = document.body.clientHeight - 100;
        changeHight = document.body.clientHeight - 203;
      }
      this.pageSetting.height = changeHight;
      dom.style.height = changeHight + 'px';
      // this.$refs.bottomDom.style.height = remainHight + 'px'
    },
  },
  created() {
    this.$store.dispatch('components/reload', this.sourceData);
  },
  mounted() {
    const that = this;
    this.getBackgroundStyle();
    this.dropDom = this.$refs.dropDom;
    this.$nextTick(() => {
      that.dropDom.onmousedown = function (e) {
        // _this.clientStartX = e.clientY
        console.log(e);
        document.onmousemove = function () {
          that.moveHandle(e.clientY, this.dropDom);
          // return false
        };
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    });
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
  // overflow-y: scroll;
  min-height: 664px;
  left: 300px;
  top: 100px;
  box-shadow: -2px 0 4px 0 rgb(0 0 0 / 10%);
  position: absolute;
}

.sourceBox {
  background-color: #fff;
  overflow: hidden;
}

.dropbtn {
  height: 30px;
  background: #f3f3f3;
  cursor: ns-resize;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropbtn:hover {
  background: #d9d9d9;
}

</style>
