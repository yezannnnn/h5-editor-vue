<template>
  <div class='dataView'>
    <div class='imgView'>
      <img class='img' :src="require('@/assets/nodata.png')" />
      <div class='imgt'>暂无数据去探索吧</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dataView',
  components: {
  },
  data() {
    return {};
  },
  methods: {},
};

</script>
<style lang="less" scoped>
.dataView {
  width: 360px;
  padding: 20px;
  z-index: 1;
  position: fixed;
  right: 0px;
  height: 100%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);

  .imgView {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .img {
      margin-bottom: 48%;
    }

    .imgt {
      color: #666;
      font-size: 16px;
      position: absolute;
      margin-top: 80%;
    }
  }
}

</style>
