if (process.env.NODE_ENV === 'production') {                                            // eslint-disable-line no-undef
    const offlinePluginRuntime = require('offline-plugin/runtime');
    offlinePluginRuntime.install();
}

import 'babel-polyfill';

require('babel-runtime/core-js/promise').default = require('bluebird');
global.Promise = require('bluebird');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import store, { history } from './redux';

import routes from './routes';

require('./global.scss');

if(process.env.DO_LOG) {                                                                // eslint-disable-line no-undef
    console.log("process.env.API_URL:", JSON.stringify(process.env.API_URL));           // eslint-disable-line no-undef
    console.log("process.env.NODE_ENV:", JSON.stringify(process.env.NODE_ENV));         // eslint-disable-line no-undef
}

render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);
