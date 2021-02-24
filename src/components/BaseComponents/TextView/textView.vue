<template>
  <div class="textView">
    文本内容点击编辑...
  </div>
</template>
<script>
export default {
  name: 'baseComponent',
  components: {
  },
  props: {},
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit('on-click');
    }
  },
};
</script>
<style lang="less" scoped>
  .textView{
    display: flex;
    justify-content: center;
    align-items: center;
    user-select:none;
    width: 100%;
    height: 50px;
  }
</style>
