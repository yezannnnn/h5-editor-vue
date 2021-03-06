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
    <arow type='flex' justify="space-around" style='margin-bottom: 12px;'>
      <acol :span='8'>
        <InputNumber :formatter="value => `W ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/W\s?|(,*)/g, '')" v-model='curComponent && curComponent.width' size="small" style='width: 90%' />
      </acol>
      <acol :span='8'>
        <InputNumber :formatter="value => `H ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\H\s?|(,*)/g, '')" v-model='curComponent && curComponent.height' size="small" style='width: 90%' />
      </acol>
      <acol :span='8'></acol>
    </arow>
    <FormModel :model='form' labelAlign='left'>
      <FormModelItem :labelCol='{span:6}' :wrapperCol='{span:18}' label='布局方式'>
        <RadioGroup default-value="left" button-style="solid" size='small' v-model='curComponent && curComponent.position'>
          <RadioButton value="absolute" title='无固定'>
            <aicon type="border" />
          </RadioButton>
          <RadioButton value="sticky" title='相对顶部固定'>
            <aicon type="pushpin" />
          </RadioButton>
        </RadioGroup>
      </FormModelItem>
    </FormModel>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  InputNumber,
  Col as acol,
  Row as arow,
  FormModel,
  Radio,
  Icon as aicon,
} from 'ant-design-vue';

const FormModelItem = FormModel.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
export default {
  name: 'areaForm',
  components: {
    InputNumber,
    acol,
    arow,
    aicon,
    FormModel,
    FormModelItem,
    RadioGroup,
    RadioButton,
  },
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapState({
      curComponent: (state) => state.components.curComponent,
    }),
  },
  methods: {},
};

</script>
<style lang="less">
</style>
