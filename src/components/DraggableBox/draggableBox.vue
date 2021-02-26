<template>
  <draggable :options="options" v-model="draggableList" @start="onStart" @end="onEnd">
    <transition-group>
      <slot></slot>
    </transition-group>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  name: 'draggableBox',
  components: { draggable },
  props: {
    draggableList: {
      type: Array,
      default () { return []; },
    },
    group: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  watch: {
    draggableList(newVal) {
      // 在监听你使用update事件来更新word,而在父组件不需要调用该函数
      this.$emit('update:draggableList', newVal);
    }

  },
  methods: {
    onStart() {
      // console.log(e);
    },
    onEnd(e) {
      // console.log(e);
      // 判断组件拖拽至画布 sourceBox
      if (e.to.offsetParent.id === 'sourceBox') {
        this.$emit('on-drag');
      }
    },
  },
};

</script>
<style lang="less" scoped>
</style>
