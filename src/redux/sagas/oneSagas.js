/* Sagas: example of goose */

import { call, put /*, select*/ } from 'redux-saga/effects';

import { history } from '../';

import {actionCreators as oneRed} from '../reducers/oneRed';

import GooseFactory from 'goosefactory';


const oneGoose = new GooseFactory("SAG/ONE", {
    init: function* ({oneId}) {
        yield put(oneRed.init(oneId));
        yield call(history.push, "/okay");
    },

}, undefined, process.env.DO_LOG, process.env.DO_LOG);          // eslint-disable-line no-undef

export const actionCreators = oneGoose.getActionCreators();
export default oneGoose;
