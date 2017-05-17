/* eslint-disable no-undef */


const getBabelConfig = (PATHS) => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: PATHS.app,

                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['react', 'es2015', 'stage-2'],
                        },
                    },
					// More loaders here
                ],
            },
        ],
    },
});

module.exports = getBabelConfig;
