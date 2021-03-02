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
      width: 100,
      height: 100,
      rotate: 0,
      top: 0,
      left: 0,
      component: () => import('@/components/BaseComponents/TextView/TextView.vue'),
      props: {
        text: '库库不知道怎么做活',
        font: {
          fontSize: 14,
          fontWeight: 400,
          color: '#000000',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        },
        isEdit: false,
      }
    }, {
      id: 1231233,
      type: 'BaseComponents',
      name: 'ImageView',
      width: 100,
      height: 100,
      rotate: 0,
      top: 0,
      left: 0,
      component: () => import('@/components/BaseComponents/ImageView/ImageView.vue'),
      props: {
        isEdit: false,
      }
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
    },
  },
  actions: {
    addSourceData({ state }, sourceData) {
      state.sourceData.push(sourceData);
    },
  },
  modules: {},
});
