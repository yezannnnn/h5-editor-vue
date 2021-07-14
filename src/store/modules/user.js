const state = {
  account: localStorage.getItem('account') ? null : JSON.parse(localStorage.getItem('account')),
  token: localStorage.getItem('token'),
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    token === false ? localStorage.removeItem('token') : localStorage.setItem('token', token);
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account;
    account === false ? localStorage.removeItem('account') : localStorage.setItem('account', account);
  },
};
const actions = {
  clearAccount({ commit }) {
    commit('SET_TOKEN', null);
    commit('SET_ACCOUNT', null);
  },
  saveAccount({ commit }, token, account) {
    commit('SET_TOKEN', token);
    commit('SET_ACCOUNT', account);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
