<template>
  <div class="index">
    <Header />
    <div class="container">
      <MediaBox />
      <div class="canvas">
        <Graduation />
        <SourceBox />
      </div>
      <!-- <DataView /> -->
    </div>
  </div>
</template>
<script>
import Header from '@/views/component/Header/header.vue';
import MediaBox from '@/views/component/MediaBox/mediaBox.vue';
// import DataView from '@/views/component/DataView/dataView.vue';
import Graduation from '@/views/component/Graduation/graduation.vue';
import SourceBox from '@/views/component/SourceBox/sourceBox.vue';

// import { Button } from 'ant-design-vue';
// import { Button as vanButton } from 'vant';
export default {
  name: 'Home',
  components: {
    Header,
    MediaBox,
    SourceBox,
    // DataView,
    Graduation,
  },
  methods: {}
};

</script>
<style lang="less" scoped>
.container {
  position: absolute;
  width: 100%;
  height: calc(100% - 56px);
  top: 56px;

  display: flex;

  .canvas {
    width: calc(100% - 360px);
    overflow: hidden;
    // height: 100vh;
    position: relative;
    // margin-left: 360px;
    white-space: nowrap;
    margin-left: 360px;
  }
}

</style>
