<template>
  <div class="shape" :class="{ active: this.active }" @click="selectCurComponent" @mousedown="handleMouseDown" @contextmenu="handleContextMenu">
    <div class="shape-point" v-for="(item, index) in (active? pointList : [])" @mousedown="handleMouseDownOnPoint(item)" :key="index" :style="getPointStyle(item)">
    </div>
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'shape',
  components: { },
  props: {},
  data() {
    return {
      pointList: ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'],
    };
  },
  methods: {
    selectCurComponent() {},
    handleMouseDown() {},
    handleContextMenu() {},
  },
};

</script>
<style lang="less" scoped>
</style>
