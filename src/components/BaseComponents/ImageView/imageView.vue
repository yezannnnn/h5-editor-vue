<template>
  <div class="imageView">
    <img :src="require('@/assets/imageView.png')" />
    <div class='title'>图片容器编辑...</div>
  </div>
</template>
<script>
export default {
  name: 'baseComponent',
  components: {},
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
.imageView {
  display: flex;
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
  flex-flow: column;

  img {
    width: 60px;
    height: 50px;
  }

  .title {
    margin-top: 10px;
    color: #bfbfbf;
  }
}

</style>
