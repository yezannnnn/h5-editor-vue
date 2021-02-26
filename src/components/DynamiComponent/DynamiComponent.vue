<!-- 异步组件封装 -->
<template>
  <component :is="currentComp" v-bind="propsOption" />
</template>
<script>
export default {
  name: 'DynamicComp',
  props: {
    currentComp: {
      type: Function,
      required: () => {}
    },
    // props 以对象方式传递
    propsOption: {
      type: Object,
      required: false,
      validator: function(val) {
        return Object.prototype.toString.apply(val) === '[object Object]';
      }
    }
  }
};
</script>
