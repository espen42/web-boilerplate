import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

global.process.env = {
    API_URL: "test url goes here",
    NODE_ENV: 'development',
    DO_LOG: false,                  // Set to true for more log output during testing
};

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
Object.keys(window).forEach((key) => {
    if (!(key in global))
        global[key] = window[key];
});
