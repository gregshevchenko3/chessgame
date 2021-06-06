const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const path = require('path');
const {merge} = require('webpack-merge');

const base = require('./webpack.base.config');
const src = path.resolve(process.cwd(), 'src');

module.exports = merge(base, {
    entry: path.join(src, 'server-entry.js'),
    target: 'node',
    devtool: 'source-map',
    output: { libraryTarget: 'commonjs2' },
    externals: nodeExternals({allowlist: /\.css$/}),
    plugins: [
        new VueSSRServerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    }
});