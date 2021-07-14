import { downloadPost, get } from '../index';

const template = {
  makeTemplate(request) {
    return downloadPost('/api/template/makeTemplate', request);
  },
  getPageInfo(request) {
    return get('/api/template/getPageInfo', request);
  },
};

export default template;
