import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sourceData: [],
    baseComponentData: [{
      id: 222123,
      type: 'BaseComponents',
      name: 'TextView',
      isEdit: false,
      component: () => import('@/components/BaseComponents/TextView/TextView.vue'),
      props: {
        text: '库库不知道怎么做活',
        isEdit: false,
      }
    }, {
      id: 1231233,
      type: 'BaseComponents',
      name: 'ImageView',
      isEdit: false,
      component: () => import('@/components/BaseComponents/ImageView/ImageView.vue'),
      props: {}
    }],
    curComponent: null,
  },
  mutations: {
    setCurComponent(state, component) {
      state.curComponent = component;
    },
    setShapeStyle(state, {
      top,
      left,
      width,
      height,
      rotate,
    }) {
      if (top) state.curComponent.top = top;
      if (left) state.curComponent.left = left;
      if (width) state.curComponent.width = width;
      if (height) state.curComponent.height = height;
      if (rotate) state.curComponent.rotate = rotate;

      debugger;
    },
  },
  actions: {
    addSourceData({ state }, sourceData) {
      state.sourceData.push(sourceData);
    },
  },
  modules: {},
});
