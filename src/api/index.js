import axios from 'axios';
// STORE AND ROUTER
// import store from '../store';
import { Message } from 'ant-design-vue';
import router from '../router';
import store from '../store';
import user from './modules/user';
import template from './modules/template';

const HOST = process.env.NODE_ENV === 'prod' ? '' : 'http://127.0.0.1:5000';
const token = localStorage.getItem('token') || '';

export function get(url, request = {}) {
  // body...
  return new Promise((resolve) => {
    const headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
    axios.get(HOST + url, {
      params: request,
      headers: headers
    })
      .then((response) => {
        if (response.data.status === 'A0230') {
          router.push('/login');
        } else {
          resolve(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            Message.error('401身份过期，请重新登录！');
            store.dispatch('user/clearAccount');
            router.push('/login');
          }
        }
      });
  });
}

export function post(url, request) {
  return new Promise((resolve) => {
    const headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
    if (token === null) delete headers.Authorization;

    axios.post(HOST + url, request, { headers: headers })
      .then((response) => {
        if (response.data.status === 'A0230') {
          router.push('/login');
        } else {
          resolve(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            Message.error('401身份过期，请重新登录！');
            store.dispatch('user/clearAccount');
            router.push('/login');
          }
        }
      });
  });
}

// 文件流下载接口
export function downloadPost(url, request) {
  return new Promise((resolve) => {
    const headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
    axios.post(HOST + url, request, {
      responseType: 'blob',
      headers: headers
    })
      .then((response) => {
        // 用户登录过期
        resolve(response);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            Message.error('401身份过期，请重新登录！');
            store.dispatch('user/clearAccount');
            router.push('/login');
          }
        }
      });
  });
}

const api = {
  user: user,
  template: template,
};

export default api;
