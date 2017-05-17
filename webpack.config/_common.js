/* eslint-disable no-undef */

const webpack = require('webpack');

// generates an index.html for the application and adds a script tag to load the generated bundle:
const HtmlWebpackPlugin = require('html-webpack-plugin');



// REMEMBER THAT EVERY VALUE MUST BE STRINGIFIED!
exports.environmentVariables = {
};



exports.getBaseConfig = (PATHS) => ({
	// Entries have to resolve to files! They rely on Node
	// convention by default so if a directory contains *index.js*,
	// it resolves to that.
    entry: {
        app: PATHS.app,
    },
    output: {
        path: PATHS.build,

		// name: a placeholder, effectively a token that will be replaced
		// when the string is evaluated, to the name of the entry: 'app'.
        filename: './js/[name]_[chunkhash:10].js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // Automatically keeps the vendors chunk up to date
            minChunks: ({ resource }) => (
				resource &&
				resource.indexOf('node_modules') >= 0 &&
				resource.match(/\.jsx?$/)
			),
        }),
        new HtmlWebpackPlugin({
            title: '[WEBPACK.CONFIG/_COMMON.JS - INSERT TITLE]',
            template: 'assets/html/index.html.template.ejs',
        }),
    ],
});
