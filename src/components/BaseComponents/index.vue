<template>
  <div>
    <li class='liItem' name='TextView' key='1'>
      <TextView />
    </li>
    <li class='liItem' name='ImageView' key='2'>
      <ImageView />
    </li>
  </div>
</template>
<script>
import TextView from '@/components/BaseComponents/TextView/textView.vue';
import ImageView from '@/components/BaseComponents/ImageView/imageView.vue';

export default {
  name: 'baseComponent',
  components: {
    TextView,
    ImageView
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
.liItem {
  margin: 15px 0px;
  border: 1px solid #fff;
  background-color: transparent;
}

.liItem:hover {
  border: 1px solid #40a9ff;
}

</style>
