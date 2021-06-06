<template> 
    <h3> Hello world </h3>
</template>
<script>
    export default {
        name: 'Home',
        metaInfo: {
            meta: [
                { name: 'description', content: 'Home page description' }
            ]
        },
        data: () => {
            return {
                title: 'Vue SSR Simple Setup Home'
            };
        }
    };
</script>
