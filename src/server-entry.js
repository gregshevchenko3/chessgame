import createApp from './app';

export default context => {
    return new Promise((resolve, reject)=>{
        const { app, router } = createApp(context);
        router.push(context.url);
        const meta = app.$meta();
        context.meta = meta;
        context.ttl = 'Server-Side Rendering';
        router.onReady(()=>{
            const matchedComponents = router.getMatchedComponents();
            if(!matchedComponents.length) return reject({ code: 404 });
            return resolve(app);
        }, reject);
        
    });
}