/* eslint-disable no-undef */

const merge = require('webpack-merge');

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                include,
                exclude,

                use: {
                    loader: 'url-loader',
                    options,
                },
            },
        ],
    },
});

exports.loadFonts = ({ include, exclude, options} = {}) => ({
    module: {
        rules: [
            {
				// Match woff2 in addition to patterns like .woff?v=1.1.1.
                test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                include,
                exclude,

                use: [
                    {
                        loader: 'url-loader', // file-loader to skip inlining
                        options: merge(
							options,
                            {
								// url-loader sets mimetype if it's passed.
								// Without this it derives it from the file extension
								//mimetype: 'application/font-woff',
                            }
						),
                    },
                ],

            },
        ],
    },
});
