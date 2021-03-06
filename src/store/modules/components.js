const state = {
  curComponent: null,
  baseComponentData: [{
    id: 222123,
    type: 'BaseComponents',
    name: 'TextView',
    width: 100,
    height: 100,
    rotate: 0,
    top: 0,
    left: 0,
    position: 'absolute',
    component: () => import('@/components/BaseComponents/TextView/TextView.vue'),
    props: {
      text: '文本内容点击编辑...',
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
    position: 'absolute',
    component: () => import('@/components/BaseComponents/ImageView/ImageView.vue'),
    props: {
      src: '',
      isEdit: false,
    }
  }],
  curStatus: null,
};
const mutations = {
  setCurComponent: (state, component) => {
    state.curComponent = component;
  },
  clearCurComponent: (state) => {
    state.curComponent = null;
  },
  setComponentStatus: (state, status) => {
    state.curStatus = status;
  },
  setShapeStyle: (state, {
    top,
    left,
    width,
    height,
    rotate,
  }) => {
    if (top) state.curComponent.top = top;
    if (left) state.curComponent.left = left;
    if (width) state.curComponent.width = width;
    if (height) state.curComponent.height = height;
    if (rotate) state.curComponent.rotate = rotate;
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
