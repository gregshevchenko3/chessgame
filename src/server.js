const express = require("express");
const vueServerRenderer = require('vue-server-renderer');
const path = require('path');
const fs = require('fs');
const { promisify, types } = require('util');
const setupDevServer = require('../configs/setup-dev-server');

const readFile = promisify(fs.readFile);
const createRenderer = async bundle =>{
    return vueServerRenderer.createBundleRenderer(bundle, {
        runInNewContext: false, 
        template: await readFile(path.resolve(__dirname, 'index.html'), 'utf-8')
    });
};

let renderer;
const app = express();
app.use('/public', express.static(path.resolve(__dirname, './dist')));
if(process.env.NODE_ENV === 'development')
    setupDevServer(app, serverBundle => renderer = createRenderer(serverBundle));
else 
    renderer = createRenderer(require('./dist/vue-ssr-server-bundle.json'));

app.get('*', async (req, res)=> {
    const context = {url: req.url};
    try {
        renderer = types.isPromise(renderer) ? await renderer : renderer
        let html = await renderer.renderToString(context);
        res.end(html);
    } 
    catch(error){
        if(error.code === 404) 
            res.status(404).end('Page not found');
        else
            res.status(500).end(error.message);
    }
});
app.listen(8080, ()=>console.log(`Listening on: 8080`));
