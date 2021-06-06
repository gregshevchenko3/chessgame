const express = require("express");
const vueServerRenderer = require('vue-server-renderer');
const path = require('path');
const fs = require('fs');
const { promisify, types } = require('util');
const setupDevServer = require('../configs/setup-dev-server');
const { google } = require('googleapis');
const people = google.people('v1');

const readFile = promisify(fs.readFile);
const createRenderer = async bundle =>{
    return vueServerRenderer.createBundleRenderer(bundle, {
        runInNewContext: false, 
        template: await readFile(path.resolve(__dirname, 'index.html'), 'utf-8')
    });
};

let oauth_secret = require(path.resolve(process.env.HOME, 'key.json'));

const oauth2Client = new google.auth.OAuth2(
  oauth_secret.client_id,
  oauth_secret.client_secret,
  oauth_secret.redirect_url
);

const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
];


let renderer;
const app = express();
app.use('/public', express.static(path.resolve(__dirname, './dist')));
if(process.env.NODE_ENV === 'development')
    setupDevServer(app, serverBundle => renderer = createRenderer(serverBundle));
else 
    renderer = createRenderer(require('./dist/vue-ssr-server-bundle.json'));

app.get('*', async (req, res)=> {
    const context = {url: req.url};
        const url = oauth2Client.generateAuthUrl({
            access_type: 'online',
            scope: scopes
        });
        // const res = await people.people.get({
        //     resourceName: 'people/me',
        //     personFields: 'emailAddresses,names,photos',
        // });
        console.log(url);
    try {
        renderer = types.isPromise(renderer) ? await renderer : renderer
        let html = await renderer.renderToString(context);
        res.end(html);
    } 
    catch(error){
        if(error.code === 404) 
            res.status(404).end('Page not found');
        else
            res.status(500).end(`error: ${error.code}, error.message: ${error.message}`);
    }
});
app.listen(8080, ()=>console.log(`Listening on: 8080`));
