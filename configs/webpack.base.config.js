const path  = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const src = path.resolve(process.cwd(), 'src');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: process.env.NODE_ENV,
    devtool: isProduction,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [ src ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }],
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpe?g|svg|gif)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'image',
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}