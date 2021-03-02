<template>
  <div class="textView" :style='getStyles()'>
    <div class="infos" v-if='!isEdit'>文本内容点击编辑...</div>
    <div v-else class='value'>{{ text }}</div>
    <div v-if='!isEdit && isHtml' class="value" v-html='text'></div>
  </div>
</template>
<script>
export default {
  name: 'baseComponent',
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: '文本内容点击编辑...'
    },
    font: {
      type: Object,
      default () {
        return {};
      }
    },
    isHtml: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {

    };
  },
  mounted() {},
  methods: {
    handleClick() {
      this.$emit('on-click');
    },
    getStyles() {
      const result = {};
      for (const i in this.font) {
        result[i] = this.font[i];
      }
      ['fontSize'].forEach((attr) => {
        result[attr] = this.font[attr] + 'px';
      });
      return result;
    }
  },
};

</script>
<style lang="less" scoped>
.textView {
  user-select: none;
  width: 100%;
  height: 100%;
  display: flex;
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

</style>
