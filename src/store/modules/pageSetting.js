import { deepCopy } from '@/utils/utils';

const state = {
  pageSetting: {
    title: '',
    background: '',
    backgroundColor: '#fff',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
    height: 664,
    width: 375,
  },
  curPage: null,
};
const mutations = {
  selectPage: (state) => {
    state.curPage = deepCopy(state.pageSetting);
  },
  setPageSetting: (state, setting) => {
    state.pageSetting = setting;
  },
  clearCurPage: (state) => {
    state.curPage = null;
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
