let webpack = require('webpack');
let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let rules = require('./webpack.config.rules');
let path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
    })
});

module.exports = {
    entry: {
        main: './src/index.js',
        cookie: './src/cookie.js'
    },
    devServer: {
        index: 'cookie.html'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('dist')
    },
    devtool: 'source-map',
    module: { rules },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlPlugin({
            title: 'Main Homework',
            template: 'cookie.hbs',
            chunks: ['cookie']
        }),
        new HtmlPlugin({
            title: 'Cookie',
            template: 'cookie.hbs',
            filename: 'cookie.html',
            chunks: ['cookie']
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    minimize: false,
                    mangle: false,
                    compress: {
                        properties: false,
                    },
                    beautify: {
                        keep_quoted_props: true,
                        quote_keys: true,
                    },
                    output: {
                        comments: false,
                        semicolons: true,
                        quote_keys: true,
                        keep_quoted_props: true,
                        beautify: false,
                    },
                },
            }),
        ]
    }
};