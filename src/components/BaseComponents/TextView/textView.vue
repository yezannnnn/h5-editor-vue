<template>
  <div class="textView" :style='styles'>
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
    fontSize: {
      type: String,
      default: '14px'
    },
    color: {
      type: String,
      default: '#000'
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    isHtml: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: ''
    },
    margin: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      styles: this.$props
    };
  },
  mounted() {},
  methods: {
    handleClick() {
      this.$emit('on-click');
    },
  },
};

</script>
<style lang="less" scoped>
.textView {
  user-select: none;
  width: 100%;
  height: 100%;

  .infos {
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;

  }

  .value {
    width: 100%;
    border: solid 0px;
    outline: none;
    resize: none;
    // padding: 10px;
  }

  .value {}
}

</style>
