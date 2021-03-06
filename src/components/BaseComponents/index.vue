<template>
  <div>
    <div @dragstart="handleDragStart">
      <div class='liItem' v-for='(item,index) in baseComponentData' :key='index' :data-index="index" draggable>
        <DynamiComponent :currentComp='item.component' :propsOption='item.props' />
      </div>
    </div>
  </div>
</template>
<script>
import DynamiComponent from '@/components/DynamiComponent/DynamiComponent.vue';

export default {
  name: 'baseComponent',
  components: {
    DynamiComponent,
  },
  props: {},
  data() {
    return {
      baseComponentData: this.$store.getters.baseComponentData,
      draggableOptions: { group: { name: 'source', pull: 'clone' }, sort: true }
    };
  },
  methods: {
    handleClick() {
      this.$emit('on-click');
    },
    handleDragStart(e) {
      e.dataTransfer.setData('index', e.target.dataset.index);
      e.dataTransfer.setData('offsetX', e.offsetX);
      e.dataTransfer.setData('clientWidth', e.target.clientWidth);
      e.dataTransfer.setData('clientHeight', e.target.clientHeight);
      e.dataTransfer.setData('offsetY', e.offsetY);
      console.log(e);
    },
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
