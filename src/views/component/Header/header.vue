<template>
  <div class="header">
    <div class="left">
      <Avatar :size='38' :src="require('@/assets/vue.png')" />
      <div class='leftTitle'>银行活动页编辑器</div>
    </div>
    <div class="content">
      <div class='btns'><Button type='primary'>模板库</Button></div>
      <div class='btns'><Button class='btns' type="link">保存模板</Button></div>
      <div class='btns'>
        <TooltipButton title="复制数据" placement="top" btnType="link" btnTitle="" :btnDisabled='false' @on-click='onCopyData' icon='copy' />
      </div>
      <div class='btns'>
        <PopconfirmButton title="确认清空当前数据，不可恢复请慎重！" placement="top" btnType="link" btnTitle="" :btnDisabled='false' @on-click='onDelete' icon='delete' />
      </div>
    </div>
    <div class="right">
      <div>
        <Avatar shape="circle" :size='36' :src='avatar.userAvatar' />
      </div>
      <div class='rightTitle'>{{ avatar.userName }}</div>
    </div>
  </div>
</template>
<script>
import { Button, Avatar, Message } from 'ant-design-vue';
import TooltipButton from '@/components/Tools/TooltipButton.vue';
import PopconfirmButton from '@/components/Tools/PopconfirmButton.vue';

export default {
  name: 'Header',
  components: {
    Avatar,
    Button,
    TooltipButton,
    PopconfirmButton,
  },
  data() {
    return {
      avatar: {
        userName: '大帅',
        userAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eohpudyPkatMJWfuROsrNxaHZ531zPbbNPoHian5HJS8PZIVrdPJRVMg4r5BkjrXqaAQWnKKENhOicg/132?imageView2/1/w/80/h/80',
      },
    };
  },
  methods: {
    onCopyData() {
      Message.success('你确认了我看');
    },
    onDelete() {
      Message.success('删除成功！');
    },
  },
};

</script>
<style lang="less" scoped>
.header {
  position: fixed;
  z-index: 999;
  height: 56px;
  width: 100%;
  display: flex;
  flex-flow: wrap;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-flow: wrap;

  .left {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;

    .leftTitle {
      margin-left: 15px;
      font-weight: 500;
      color: #666;
    }
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 15;

    .btns {
      // width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 8px;
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 4;

    .rightTitle {
      margin-left: 5px;
      font-weight: 500;
      color: #666;
    }
  }
}

</style>
