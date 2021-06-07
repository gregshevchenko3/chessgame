const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.base.config');
const TerserPlugin = require("terser-webpack-plugin");

const src = path.resolve(process.cwd(), 'src');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = merge(base, {
    entry: {
        app: path.join(src, 'client-entry.js')
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
            })
        ]
    },
    target: 'web',
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: '/public',
        filename: isProduction ? '[name].[fullhash].js' : '[name].js',
      //  sourceMapFilename: isProduction ? '[name].[fullhash].js.map' : '[name].js.map'
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    stats: {
        orphanModules: false
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                parser: "postcss-js"
                            },
                            execute: true
                        }
                    }
                ],
            },
            {
                test:  /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.less$/i,
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