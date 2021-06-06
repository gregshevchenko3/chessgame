import createApp  from './app';

const { app } = createApp({state: window.__INITIAL_STATE__});
import './app.scss';

router.onReady(() => {
    app.$mount('#app');
});