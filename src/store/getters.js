/* eslint-disable arrow-parens */
const getters = {
  sourceData: state => state.sourceData.sourceData,
  baseComponentData: state => state.components.baseComponentData,
  curComponent: state => state.components.curComponent,
  pageSetting: state => state.pageSetting.pageSetting,
};
export default getters;
