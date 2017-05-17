import { hashHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import thunk from 'redux-thunk';

import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&                                            // eslint-disable-line no-undef
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
        compose;

const configureStore = function (history, initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware)
        )
    );
    sagaMiddleware.run(rootSaga);

    return store;
};

const store = configureStore(hashHistory);

if (process.env.DO_LOG) {                                                               // eslint-disable-line no-undef
    console.log(
        "Will log store... (process.env.DO_LOG = " +
        JSON.stringify(process.env.DO_LOG) +                                            // eslint-disable-line no-undef
        ")"
    );
    store.subscribe( ()=>{ console.log("Store updated:", store.getState()); });
}

export default store;

export const history = hashHistory;
