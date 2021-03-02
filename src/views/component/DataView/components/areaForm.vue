<template>
  <div class="areaForm">
    <arow type='flex' justify="space-around" style='margin-bottom: 10px;'>
      <acol :span='8'>
        <InputNumber :formatter="value => `X ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\X\s?|(,*)/g, '')" v-model='curComponent && curComponent.left' size="small" style='width: 90%' />
      </acol>
      <acol :span='8'>
        <InputNumber :formatter="value => `Y ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\Y\s?|(,*)/g, '')" v-model='curComponent && curComponent.top' size="small" style='width: 90%' />
      </acol>
      <acol :span='8'>
        <InputNumber :formatter="value => `R ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\R\s?|(,*)/g, '')" v-model='curComponent && curComponent.rotate' size="small" style='width: 90%' />
      </acol>
    </arow>
    <arow type='flex' justify="space-around">
      <acol :span='8'>
        <InputNumber :formatter="value => `W ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/W\s?|(,*)/g, '')" v-model='curComponent && curComponent.width' size="small" style='width: 90%' />
      </acol>
      <acol :span='8'>
        <InputNumber :formatter="value => `H ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\H\s?|(,*)/g, '')" v-model='curComponent && curComponent.height' size="small" style='width: 90%' />
      </acol>
      <acol :span='8'></acol>
    </arow>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  InputNumber,
  Col as acol,
  Row as arow,
} from 'ant-design-vue';

export default {
  name: 'areaForm',
  components: {
    InputNumber,
    acol,
    arow,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['curComponent'])
  },
  methods: {},
};

</script>
<style lang="less">
</style>
