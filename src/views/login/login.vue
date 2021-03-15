<template>
  <div class="index">
    <div class="loginBox">
      <h3 style='margin-bottom: 20px'>活动页编辑器</h3>
      <Input style='margin-bottom: 20px' v-model='userName' />
      <Input type='password' style='margin-bottom: 30px;' v-model='password' />
      <Button type='danger' @click='toLogin'>登录</Button>
    </div>
  </div>
</template>
<script>
import { Input, Button, Message } from 'ant-design-vue';

export default {
  name: 'Home',
  components: {
    Input,
    Button,
  },
  data() {
    return {
      userName: null,
      password: null
    };
  },
  methods: {
    toLogin() {
      this.$Api.user.login({
        username: this.userName,
        password: this.password
      }).then((res) => {
        if (res.code === 200) {
          Message.success(res.msg);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('account', res.data);
          this.$router.push('/');
        } else {
          Message.error(res.msg);
        }
      });
    }
  }
};

</script>
<style lang="less" scoped>
.loginBox {
  padding: 20px;
  background: #fff;
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -150px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  box-shadow: 1px 1px 1px 2px #f3f3f3;
  flex-flow: column;
}

</style>
