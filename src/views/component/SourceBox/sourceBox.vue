<template>
  <div class='sourceBox'>
  </div>
</template>
<script>
export default {
  name: 'sourceBox',
  components: {},
  data() {
    return {
      activeKey: '1'
    };
  },
  methods: {
    changeTabs(key) {
      this.activeKey = key;
    },
  }
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
</style>
