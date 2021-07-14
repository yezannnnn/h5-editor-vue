<template>
  <div class="rectangle" :style='getStyles()'>
    <div class="infos" v-if='!isEdit'>矩形组件点击编辑...</div>
    <vimage :src="src" v-if='src' fit='contain' />
    <div v-else class='value'>{{ text }}</div>
  </div>
</template>
<script>
import { Image as vimage } from 'vant';

export default {
  name: 'baseComponent',
  components: {
    vimage
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
    },
    font: {
      type: Object,
      default () {
        return {};
      }
    },
    text: {
      type: String,
      default: '',
    },
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
    getStyles() {
      const result = {};
      for (const i in this.font) {
        result[i] = this.font[i];
      }
      for (const i in this.looks) {
        result[i] = this.looks[i];
      }
      ['fontSize'].forEach((attr) => {
        result[attr] = this.font[attr] + 'px';
      });
      ['borderWidth', 'borderRadius'].forEach((attr) => {
        result[attr] = this.looks[attr] + 'px';
      });
      // 圆形
      if (this.looks.isYuan) {
        result.borderRadius = '50%';
      }
      return result;
    }
  },
};

</script>
<style lang="less" scoped>
.rectangle {
  user-select: none;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  border-color: #f3f3f3;
  border-width: 1px;
  border-style: solid;
  // background-color: #fff;
  overflow: hidden;

  .infos {
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;

  }

  .value {
    border: solid 0px;
    outline: none;
    resize: none;
    white-space: normal;
    overflow-y: hidden;
    word-break: break-all;
    display: flex;
    // padding: 10px;
  }

  .value {}
}
/deep/ .van-image__img {
  -webkit-user-drag: none;
}
</style>
