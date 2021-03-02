<template>
  <Collapse :activeKey='activeAttr' expandIconPosition='right' :bordered='false'>
    <CollapsePanel key='1' header="坐标及宽高">
      <areaForm />
    </CollapsePanel>
    <CollapsePanel key='2' header="文本" v-if='curComponent && curComponent.props.text.length >= 0'>
      <textForm />
    </CollapsePanel>
    <CollapsePanel key='3' header="字体" v-if='curComponent && curComponent.props.font'>
      <fontForm />
    </CollapsePanel>
  </Collapse>
</template>
<script>
import { mapState } from 'vuex';
import { Collapse } from 'ant-design-vue';
import areaForm from './components/areaForm.vue';
import textForm from './components/textForm.vue';
import fontForm from './components/fontForm.vue';

const CollapsePanel = Collapse.Panel;
export default {
  name: 'styleData',
  components: {
    areaForm,
    textForm,
    fontForm,
    Collapse,
    CollapsePanel,
  },
  data() {
    return {
      activeAttr: ['1', '2', '3', '4', '5', '6'],
    };
  },
  methods: {},
  computed: {
    ...mapState(['curComponent'])
  }
};

</script>
<style lang="less">
</style>
