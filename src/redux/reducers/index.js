import { combineReducers } from 'redux';

import oneReducer from './oneRed';

export default combineReducers({
    one: oneReducer,
});
