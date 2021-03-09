<template>
  <div class="shape" :class="{ active: this.active }" @click="selectCurComponent" @mousedown="handleMouseDown" @contextmenu="handleContextMenu">
    <span class="icon-xiangyouxuanzhuan" v-show="this.active" @mousedown="handleRotate">
      <img :src="require('@/assets/rotate.png')">
    </span>
    <div class="shape-point" v-for="(item, index) in (active? pointList : [])" @mousedown="handleMouseDownOnPoint(item, $event)" :key="index" :style="getPointStyle(item)">
    </div>
    <slot></slot>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { mod360 } from '@/utils/translate';

export default {
  name: 'shape',
  components: {},
  props: {
    dom: {
      type: Object,
      default () {
        return {};
      }
    },
    active: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      pointList: ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'],
      cursors: {},
      initialAngle: { // 每个点对应的初始角度
        lt: 0,
        t: 45,
        rt: 90,
        r: 135,
        rb: 180,
        b: 225,
        lb: 270,
        l: 315,
      },
      angleToCursor: [ // 每个范围的角度对应的光标
        { start: 338, end: 23, cursor: 'nw' },
        { start: 23, end: 68, cursor: 'n' },
        { start: 68, end: 113, cursor: 'ne' },
        { start: 113, end: 158, cursor: 'e' },
        { start: 158, end: 203, cursor: 'se' },
        { start: 203, end: 248, cursor: 's' },
        { start: 248, end: 293, cursor: 'sw' },
        { start: 293, end: 338, cursor: 'w' },
      ],
    };
  },
  computed: {
    ...mapState({
      curComponent: (state) => state.components.curComponent,
    }),
  },
  mounted() {
    if (this.curComponent) {
      this.cursors = this.getCursor(); // 根据旋转角度获取光标位置
    }
  },
  methods: {
    selectCurComponent() {},
    handleMouseDown(e) {
      const component = this.dom;
      component.props.isEdit = true;
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

      this.cursors = this.getCursor(); // 根据旋转角度获取光标位置

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
    handleContextMenu() {},
    getPointStyle(point) {
      const { width, height } = this.dom;
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      let newLeft = 0;
      let newTop = 0;

      // 四个角的点
      if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
      } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
          newLeft = width / 2;
          newTop = hasT ? 0 : height;
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width;
          newTop = Math.floor(height / 2);
        }
      }

      const style = {
        marginLeft: hasR ? '-4px' : '-4px',
        marginTop: '-4px',
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: this.cursors[point],
      };

      return style;
    },
    handleMouseDownOnPoint(point) {
      const downEvent = window.event;
      downEvent.stopPropagation();
      downEvent.preventDefault();

      const pos = { ...this.dom };
      const height = Number(pos.height);
      const width = Number(pos.width);
      const top = Number(pos.top);
      const left = Number(pos.left);
      const startX = downEvent.clientX;
      const startY = downEvent.clientY;

      // 是否需要保存快照
      // let needSave = false;
      const move = (moveEvent) => {
        // needSave = true;
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        const disY = currY - startY;
        const disX = currX - startX;
        const hasT = /t/.test(point);
        const hasB = /b/.test(point);
        const hasL = /l/.test(point);
        const hasR = /r/.test(point);
        const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
        const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
        pos.height = newHeight > 0 ? newHeight : 0;
        pos.width = newWidth > 0 ? newWidth : 0;
        pos.left = left + (hasL ? disX : 0);
        pos.top = top + (hasT ? disY : 0);
        this.$store.commit('components/setShapeStyle', pos);
      };

      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        // needSave && this.$store.commit('recordSnapshot')
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },
    handleRotate(e) {
      // this.$store.commit('setClickComponentStatus', true)
      e.preventDefault();
      e.stopPropagation();
      // 初始坐标和初始角度
      const pos = this.dom;
      const startY = e.clientY;
      const startX = e.clientX;
      const startRotate = pos.rotate || 0;
      // 获取元素中心点位置
      const rect = this.$el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 旋转前的角度
      const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);

      // 如果元素没有移动，则不保存快照
      // let hasMove = false;
      const move = (moveEvent) => {
        // hasMove = true;
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        // 旋转后的角度
        const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
        // 获取旋转的角度值
        pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore;
        // 修改当前组件样式
        this.$store.commit('components/setShapeStyle', pos);
      };

      const up = () => {
        // hasMove && this.$store.commit('recordSnapshot');
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        this.cursors = this.getCursor(); // 根据旋转角度获取光标位置
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },
    getCursor() {
      const {
        angleToCursor,
        initialAngle,
        pointList,
        curComponent
      } = this;
      console.log(curComponent);
      const rotate = mod360(curComponent.rotate); // 取余 360
      const result = {};
      let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
      pointList.forEach((point) => {
        const angle = mod360(initialAngle[point] + rotate);
        const len = angleToCursor.length;
        while (true) {
          lastMatchIndex = (lastMatchIndex + 1) % len;
          const angleLimit = angleToCursor[lastMatchIndex];
          if (angle < 23 || angle >= 338) {
            result[point] = 'nw-resize';

            return;
          }

          if (angleLimit.start <= angle && angle < angleLimit.end) {
            result[point] = angleLimit.cursor + '-resize';

            return;
          }
        }
      });

      return result;
    },
  },
};

</script>
<style lang="less" scoped>
.shape {
  user-select: none;
  position: absolute;
  display: flex;
  // margin: 1px 0;
}

.shape:hover {
  box-shadow: 0 0 0 1px #40a9ff;
}

.active {
  cursor: move;
  box-shadow: 0 0 0 1px #40a9ff;
}

.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}

.icon-xiangyouxuanzhuan {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 600;
  cursor: grab;
  color: #59c7f9;
  font-size: 20px;
  font-weight: 600;

  &:active {
    cursor: grabbing;
  }

  img {
    height: 18px;
  }
}

</style>
