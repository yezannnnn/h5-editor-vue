import Vue from 'vue';
// import vcolorpicker from 'vcolorpicker';

import { ColorPicker, Button, Input } from 'element-ui';

import App from './App.vue';
import router from './router';
import store from './store';
import Api from './api';

// 引用 colorPicker
Vue.use(ColorPicker);
Vue.use(Button);
Vue.use(Input);

Vue.config.productionTip = false;
Vue.prototype.$Api = Api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
