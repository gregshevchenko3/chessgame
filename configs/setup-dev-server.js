const setupDevServer = (app, onServerBundleReady) => {
    const webpack = require('webpack');
    const mfs = require('memory-fs');
    const path = require('path');

    const clientCfg = require('./webpack.client.config');
    const serverCfg = require('./webpack.server.config');

    clientCfg.entry.app = ['webpack-hot-middleware/client', clientCfg.entry.app];
    const clientCompiler = webpack(clientCfg);

    app.use(require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientCfg.output.publicPath,
        serverSideRender: true
    }));
    app.use(require('webpack-hot-middleware')(clientCompiler));
    
    global.console.log('Building SSR bundle...');
    const serverCompiler = webpack(serverCfg);
    const _mfs = new mfs();
    serverCompiler.outputFileSystem = _mfs;
    serverCompiler.watch({}, (error, stats) => {
        if(error) throw error;
    
        global.console.log(`${stats.toString({
            colors: true, 
            chunks: false,
            chunkModules: false,
            modules: false,
            children: false,
        })}`);

        const info = stats.toJson();
        if (stats.hasErrors()) {
            console.error(info.errors);
            throw new Error('error');
        }
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        };
        const bundle = JSON.parse(
            mfs.readFileSync(path.join(clientConfig.output.path, 'vue-ssr-server-bundle.json'), 'utf-8')
        );
        onServerBundleReady(bundle);
    });
};
module.exports = setupDevServer;