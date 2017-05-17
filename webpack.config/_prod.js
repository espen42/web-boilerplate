/* eslint-disable no-undef */

const webpack = require('webpack');
const merge = require('webpack-merge');

// Cleans up the build directory
const CleanWebpackPlugin = require('clean-webpack-plugin');
// ES6-aware minifier
const BabiliPlugin = require('babili-webpack-plugin');

const OfflinePlugin = require('offline-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const commonEnv = require('./_common.js').environmentVariables;

const getCommonConfig = require('./allCommon.js');
const getStyleConfig = require('./styling.js').getStyleConfig; // different syntax

const assetLoaders = require('./assets');
const getImageLoader = assetLoaders.loadImages; // different syntax
const getFontLoader = assetLoaders.loadFonts; // different syntax



// REMEMBER THAT EVERY VALUE MUST BE STRINGIFIED!
const environmentVariables = (doLog) => ({
    'process.env': {
        /*API_URL: '"Haha Im not even a PROD URL yet"',*/
        NODE_ENV: JSON.stringify('production'),
        DO_LOG: JSON.stringify(doLog),
    },
});




const getProdConfig = (PATHS, doLog) => {
    let doLogDependentConfig = {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: "webpack-strip?strip[]=console.log",
                },
            ],
        },
    };

    if (doLog) {
        console.log("Logging and sourcemaps.");
        doLogDependentConfig =
        {
            devtool: "source-map",
        };
    }

    const prodConfig = merge(
        {
            plugins: [
                new WebpackShellPlugin({
                    onBuildStart: [
                        'echo rm -rf chaser_tmp',
                        'rm -rf chaser_tmp',

                        'echo git clone git@github.com:espen42/chaser.git chaser_tmp',
                        'git clone git@github.com:espen42/chaser.git chaser_tmp',
                    ],
                    onBuildEnd: [
                        'echo mv chaser_tmp/.git dist/.git',
                        'mv chaser_tmp/.git dist/.git',

                        'echo mv chaser_tmp/README.md dist',
                        'mv chaser_tmp/README.md dist',

                        'echo rm -rf chaser_tmp',
                        'rm -rf chaser_tmp',

                        'echo mv images dist',
                        'mv images dist',

                        'echo mv fonts dist',
                        'mv fonts dist',

                        'echo cp assets/images/icon15.png dist/images/icon15.png',
                        'cp assets/images/icon15.png dist/images/icon15.png',

                        'echo Done.',
                    ],
                }),
                new CleanWebpackPlugin([PATHS.build], {
                    root: process.cwd(),
                    verbose: true,
                    dry: false,
                }),
                new BabiliPlugin({
                    comments: false,
                }),
                new webpack.DefinePlugin(merge(
                    commonEnv,
                    environmentVariables(doLog)
                )),
                new OfflinePlugin({
                    externals: ['index.html', 'images/icon15.png'],
                }),
            ],
        },
        doLogDependentConfig
    );

    // console.log("\nPROD CONFIG:\n" + JSON.stringify(prodConfig) + "\n\n");

    return prodConfig;
};



module.exports = (PATHS, doLog) => merge(
	getCommonConfig(PATHS),
	getStyleConfig({ prod: true }),
	getImageLoader(
    {
        options: {
            // Limit at 15k. Above that it emits separate files
            limit: 20000,

            // Output below images directory
            path: PATHS.build,
            name: '../images/[name].[ext]',     // TODO: WHY doesn't relative path work here?
        },
    }),

	getFontLoader(
    {
        options: {
            // Limit at 50k. Above that it emits separate files
            limit: 50000,

            // Output below fonts directory
            path: PATHS.build,
            name: '../fonts/[name].[ext]',      // TODO: WHY doesn't relative path work here?
        },
    }),

	getProdConfig(PATHS, doLog)
);
