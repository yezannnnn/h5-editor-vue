<template>
  <div class="index">
    <Header/>
    <div class="container">
      <MediaBox/>
      <div class="canvas">
        <!-- 定位画布 -->
        <div class="returnBack" title="定位回画布"></div>
        <Graduation/>
        <SourceBox/>
      </div>
      <DataView/>
    </div>
  </div>
</template>
<script>
import Header from '@/views/component/Header/header.vue';
import MediaBox from '@/views/component/MediaBox/mediaBox.vue';
import DataView from '@/views/component/DataView/dataView.vue';
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
    DataView,
    Graduation,
  },
  data() {
    return {
      id: null,
    };
  },
  methods: {},
  async mounted() {
    this.id = this.$route.query.id;
    const res = await this.$Api.template.getPageInfo({ id: this.id });
    if (res.code === 200) {
      // console.log(res);
      this.$message.success('加载组件成功！');
      this.$store.commit('pageSetting/setPageSetting', res.data.page);
      this.$store.commit('sourceData/setSourceData', res.data.sourceData);
      await this.$store.dispatch('components/reload', res.data.sourceData);
    }
  }
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
    overflow: scroll;
    // height: 100vh;
    position: relative;
    // margin-left: 360px;
    white-space: nowrap;
    margin-left: 360px;

    .returnBack {
      position: fixed;
      top: 56px;
      left: 360px;
      height: 20px;
      width: 20px;
      background: #1890ff;
      cursor: pointer;
    }
  }

  .canvas::-webkit-scrollbar {
    width: 0;
  }
}

</style>
