import { deepCopy } from '@/utils/utils';

const state = {
  sourceData: [],
};
const mutations = {
  // addSourceData
  addSourceData: (state, sourceData) => {
    state.sourceData.push(sourceData);
  },
  // 删除画布中选中组件
  delSourceData: (state, id) => {
    state.sourceData.forEach((i, ind) => {
      if (i.id === id) {
        state.sourceData.splice(ind, 1);
        state.curComponent = null;
      }
    });
  },
};
const actions = {
  // 复制画布中选中组件
  copyInSourceData({ state }) {
    const copyComponent = deepCopy(state.curComponent);
    copyComponent.id = new Date().getTime();
    // 复制的组件 稍微偏移好区分
    copyComponent.top += 10;
    copyComponent.left += 10;
    state.sourceData.push(copyComponent);
  },
  // 组件相对画布置顶
  topComponent({ state }, id) {
    let index = 0;
    state.sourceData.forEach((i, ind) => {
      if (i.id === id) {
        index = ind;
      }
    });

    const swp = state.sourceData[index];
    state.sourceData.splice(index, 1);
    state.sourceData.push(swp);
  },
  // 组件相对画布置底
  bottomComponent({ state }, id) {
    let index = 0;
    state.sourceData.forEach((i, ind) => {
      if (i.id === id) {
        index = ind;
      }
    });
    debugger;
    const swp = state.sourceData[index];
    state.sourceData.splice(index, 1);
    state.sourceData.unshift(swp);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
