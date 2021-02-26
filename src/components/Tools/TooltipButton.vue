<template>
  <div>
    <Tooltip :title='title' :placement='placement'>
      <Button @click='handleClick' :type='btnType' :icon='icon' :disabled='btnDisabled'>{{ btnTitle }}</Button>
    </Tooltip>
  </div>
</template>
<script>
import { Button, Tooltip } from 'ant-design-vue';

export default {
  name: 'TooltipButton',
  components: {
    Button,
    Tooltip,
  },
  props: {
    btnDisabled: {
      type: Boolean,
      default: false,
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
    },
  },
};

</script>
