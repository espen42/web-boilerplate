/* eslint-disable no-undef */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugin = new ExtractTextPlugin({
    filename: './css/[name]_[contenthash:10].css',
});

const useCssLoader = {
    loader: 'css-loader',
    options: {
        modules: true,     // TRUE TO USE CSS-MODULES!
    },
};

const usePostCssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: ()=>([
            require('autoprefixer'),
        ]),
    },
};

const useProd = () => plugin.extract({
    fallback: 'style-loader',
    use: [
        useCssLoader,
        usePostCssLoader,
        'sass-loader',
    ],
});

const useDev = () => [
    'style-loader',
    useCssLoader,
    usePostCssLoader,
    'sass-loader',
];

const getStyleConfig = ({ include, exclude, prod } = {}) => ({
    module: {
        rules: [
            {
                test: /\.s?css$/,
                include,
                exclude,

                use: prod ? useProd() : useDev(),
            },
        ],
    },

    plugins: [ plugin ],
});

exports.getStyleConfig = getStyleConfig;  // Just demonstrating a different syntax from module.exports
