/* eslint-disable no-undef */

const esLint = {
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',

				loader: 'eslint-loader',
				options: {
					emitWarning: true,
				},
			},
		]
	}
};

module.exports = esLint;