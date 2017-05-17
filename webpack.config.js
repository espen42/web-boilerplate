/* eslint-disable no-undef */

// https://survivejs.com/webpack/developing/getting-started/

const path = require('path');
const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist'),
};

const getDevConfig = () => require('./webpack.config/_dev.js')(PATHS);
const getProdConfig = (doLog) => require('./webpack.config/_prod.js')(PATHS, doLog);

module.exports = (env) => {
    const config = (env.target === 'production') ?
		getProdConfig(env.do_log || false) :
		getDevConfig();

    //console.log("\nCONFIG: ", JSON.stringify(config), "\n\n");

    return config;
};
