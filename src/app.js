import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import Meta from 'vue-meta'
import {createRouter} from './router';

Vue.use(Vuex);
Vue.use(Meta, {ssrAppId: 1});
export default function createApp(context){
    const router = createRouter();
    const app = new Vue({
        router,
        render: h => h(App)
    });
    return { app }
}