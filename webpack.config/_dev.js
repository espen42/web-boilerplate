/* eslint-disable no-undef */

const webpack = require('webpack');
const merge = require('webpack-merge');

const commonEnv = require('./_common.js').environmentVariables;

const getCommonConfig = require('./allCommon.js');
const getStyleConfig = require('./styling.js').getStyleConfig; // different syntax
const assetLoaders = require('./assets');
const getImageLoader = assetLoaders.loadImages; // different syntax
const getFontLoader = assetLoaders.loadFonts; // different syntax

// REMEMBER THAT EVERY VALUE MUST BE STRINGIFIED!
const environmentVariables = {
    /*API_URL: '"Haha Im not even a DEV URL yet"',*/
    NODE_ENV: JSON.stringify("development"),
    DO_LOG: JSON.stringify(true),
};




const devConfig = {
    output: {
        devtoolModuleFilenameTemplate: "webpack:///[absolute-resource-path]",
    },
    devtool: "cheap-module-eval-source-map",

    devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. Good for complex setups.
        historyApiFallback: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // Parse host and port from env to allow customization.
        //
        // If you use Docker, Vagrant or Cloud9, set
        // host: options.host || '0.0.0.0';
        //
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        host: process.env.HOST, // Defaults to `localhost`
        port: process.env.PORT, // Defaults to 8080

		// overlay: true captures only errors
        overlay: {
            errors: true,
            warnings: true,
        },
    },
    plugins: [
        new webpack.DefinePlugin(merge(
			commonEnv,
			environmentVariables
		)),
    ],
};


module.exports = (PATHS) => merge(
	getCommonConfig(PATHS),
	getStyleConfig(),
	getImageLoader(),
	getFontLoader(),
	devConfig
);
