<template>
  <div class="imageView" :style='{ "height": !isEdit ? "150px" : "100%", "background": !src ? "#f3f3f3" : "none" }'>
    <!-- <div class="wrapper"> -->
    <img v-if='!isEdit || !src' :src="require('@/assets/imageView.png')" :style='looks' />
    <vimage v-else fit='contain' :src="src" />
    <!-- </div> -->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { Image as vimage } from 'vant';

export default {
  name: 'baseComponent',
  components: {
    vimage,
  },
  computed: {
    ...mapState({
      curComponent: (state) => state.components.curComponent,
    }),
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
    looks: {
      type: Object
    }
  },
  data() {
    return {
      styles: this.$props,

    };
  },
  methods: {
    handleClick() {
      this.$emit('on-click');
    },
  },
};

</script>
<style lang="less" scoped>
.imageView {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  img {
    width: 60px;
    -webkit-user-drag: none;
    height: 50px;
  }

  .title {
    margin-top: 10px;
    color: #bfbfbf;
  }
}

.imageH {
  height: 150px;
}

/deep/ .van-image__img {
  -webkit-user-drag: none;
}

/deep/ .van-image {
  width: 100%;
  height: 100%;
}

</style>
