import createApp from './app';

export default context => {
    const { app } = createApp(context);
    app.$router.push(context.url);
    const meta = app.$meta();
    context.meta = meta;
    context.ttl = 'Server-Side Rendering';
    return app;
}