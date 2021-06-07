import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import Meta from 'vue-meta'
import {createRouter} from './router';
import {createStore} from './store';
import { sync } from 'vuex-router-sync';

import './app.scss';

Vue.use(Vuex);
Vue.use(Meta, {ssrAppId: 1});
export default function createApp(context){
    const router = createRouter();
    const store = createStore(context.state);

    sync(store, router);
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });
    return { app, router, store};
}