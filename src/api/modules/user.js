import { post } from '../index';

const user = {
  login(request) {
    return post('/api/user/login', request);
  },
};

export default user;
