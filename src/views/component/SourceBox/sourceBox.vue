<template>
  <!-- "top": item.top || 0 + "px", "left": item.left || 0 + "px","width": item.width||0 + "px","height": item.height||0 + "px" -->
  <div class='sourceBox' id='sourceBox' @drop="handleDrop" @dragover.prevent>
    <div class="liItem" v-for='(item,index) in sourceComponents' :key='index' @mousedown='(e) => { handleMouseDown(e,index) }' :style="{'top':`${item.top}px`,'left':`${item.left}px`, 'width': `${item.width}px`,'height': `${item.height}px`}">
      <DynamiComponent :currentComp='item.component' :propsOption='item.props' />
    </div>
  </div>
</template>
<script>
// 异步加载组件
import DynamiComponent from '@/components/DynamiComponent/DynamiComponent.vue';
import { deepCopy } from '@/utils/utils';

export default {
  name: 'sourceBox',
  components: {
    DynamiComponent,
  },
  data() {
    return {
      sourceComponents: this.$store.state.sourceData,
      boxX: 0,
      boxY: 0,
      start: { // 选中区域的起点
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(e);
      const comp = deepCopy(this.$store.state.baseComponentData[e.dataTransfer.getData('index')]);
      comp.top = e.offsetY - e.dataTransfer.getData('offsetY');
      comp.left = e.offsetX - e.dataTransfer.getData('offsetX');
      comp.width = e.dataTransfer.getData('clientWidth');
      comp.height = e.dataTransfer.getData('clientHeight');
      comp.id = new Date().getTime();
      console.log(comp);

      this.$store.dispatch('addSourceData', comp);
    },
    handleDragOver() {},
    handleMouseDown(e, index) {
      const component = this.sourceComponents[index];
      const pos = {};
      e.stopPropagation();
      this.$store.commit('setCurComponent', component);

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
        this.$store.commit('setShapeStyle', pos);
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
  },
  created() {
    this.sourceComponents.forEach((item) => {
      item.component = () => import('@/components/' + item.type + '/' + item.name + '/' + item.name + '.vue');
    });
  },
};

</script>
<style lang="less" scoped>
.sourceBox {
  width: 375px;
  min-height: 664px;

  background-color: #fff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, .2);
  position: absolute;
  left: 300px;
  top: 100px;
  transition: transform .3s ease-out;
  overflow: hidden;
}

.liItem {
  user-select: none;
  display: block;
  position: absolute;
  margin: 1px 0;
}

.liItem:hover {
  box-shadow: 0 0 0 1px #40a9ff;
}

</style>
