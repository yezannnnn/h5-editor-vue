import axios from 'axios';
// STORE AND ROUTER
// import store from '../store';
import { Message } from 'ant-design-vue';
import router from '../router';
import user from './modules/user';
import template from './modules/template';

const HOST = process.env.NODE_ENV === 'prod' ? '' : 'http://127.0.0.1:5000';
const token = localStorage.getItem('token') || '';

export function get(url, request = {}) {
  // body...
  return new Promise((resolve) => {
    const headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
    axios.get(HOST + url, { params: request, headers: headers })
      .then((response) => {
        if (response.data.status === 'A0230') {
          router.push('/login');
        } else {
          resolve(response.data);
        }
      }).catch((error) => {
        Message.error(error);
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
      }).catch((error) => {
        Message.error(error);
      });
  });
}

// 文件流下载接口
// export function downloadPost(url, request) {
//   return new Promise((resolve, reject) => {
//     var headers = {
//       'Authorization': 'bearer ' + localStorage.getItem('token'),
//       'client-type': 'browser',
//       'Content-Type': 'application/json;',
//       'Accept': 'application/json'
//     }
//     axios.post(HOST + url, request, { responseType: 'blob', headers: headers })
//       .then(response => {
//         // 用户登录过期
//         if (response.data.status === 'A0230') {
//           if (!isExpired) {
//             Message.error(response.data.message)
//             setTimeout(() => {
//               isExpired = false
//             }, 2000)
//           }
//           store.dispatch('user/resetToken')
//           store.dispatch('tagsView/delAllViews')
//           router.push(`/login`)
//         } else {
//           resolve(response)
//         }
//       }).catch(error => {
//         console.log(error)
//       })
//   })
// }

const api = {
  user: user,
  template: template,
};

export default api;
