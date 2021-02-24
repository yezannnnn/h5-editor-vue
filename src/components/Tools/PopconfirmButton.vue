<template>
  <div>
    <Popconfirm :disabled='btnDisabled' :placement='placement' :title='title' @confirm='handleClick' okText="确认" cancelText="取消">
      <Button :type="btnType" :icon='icon' :disabled='btnDisabled'>
        {{ btnTitle }}
      </Button>
    </Popconfirm>
  </div>
</template>
<script>
import { Button, Popconfirm } from 'ant-design-vue';

export default {
  name: 'PopconfirmButton',
  components: {
    Button,
    Popconfirm
  },
  props: {
    btnDisabled: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    btnTitle: {
      type: String,
      default: '',
    },
    btnType: {
      type: String,
      default: 'link',
    },
  },
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
