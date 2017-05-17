import DuckFactory from 'duckfactory';

const initOne = {
    firstAttrib: null,
};

const one = new DuckFactory("RED/ONE", initOne, {
    init: (state, {attr}) => ({
        ...state,
        firstAttrib: attr,
    }),

}, process.env.DO_LOG, process.env.DO_LOG);                         // eslint-disable-line no-undef
export default one.getReducer();
export const actionCreators = one.getActionCreators();
