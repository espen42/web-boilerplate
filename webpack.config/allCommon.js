/* eslint-disable no-undef */

// Funnels all configs that are used in both dev and prod into one common config.
// This is then directed into both dev and prod

const merge = require('webpack-merge');

const getBaseConfig = require('./_common.js').getBaseConfig;

const getBabelConfig = require('./babel.js');
const lintConfig = require('./linting.js');



const commonConfig = (PATHS) => merge(
	getBaseConfig(PATHS),
	getBabelConfig(PATHS),
	lintConfig
);

module.exports = commonConfig;
