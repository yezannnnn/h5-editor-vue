import { post } from '../index';

const template = {
  makeTemplate(request) {
    return post('/api/template/makeTemplate', request);
  },
};

export default template;
