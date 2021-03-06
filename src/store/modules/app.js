const state = {};
const mutations = {};
const actions = {
  makeVue({ state }) {
    console.log(`pageSetting==>${state.pageSetting}`);
    console.log(`sourceData==>${state.sourceData}`);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
