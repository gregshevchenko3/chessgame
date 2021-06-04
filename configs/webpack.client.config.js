const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.base.config');

const src = path.resolve(process.cwd(), 'src');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = merge(base, {
    entry: {
        app: path.join(src, 'client-entry.js')
    },
    target: 'web',
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: '/public',
        filename: isProduction ? '[name].[hash].js' : '[name][contenthash].js',
        sourceMapFilename: isProduction ? '[name].[hash].js.map' : '[name].js.map'
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    isProduction ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.scss$/i,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    },
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'stylus-loader',
                ]
            },
        ]
    },
    plugins: (
        isProduction 
        ? [
            new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
        ]
        : [
            new MiniCssExtractPlugin({filename: '[name].css'}),
            new webpack.HotModuleReplacementPlugin(),
        ]
    ),
});