<template>
    <div id="app">
        <div class="main">
            <h1> {{ title }} </h1>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    export default {
        name: 'App',
        metaInfo: {
            meta: [
                { charset: 'utf-8' },
                { title: 'Server-Side Rendering'},
            ]
        },
        data: () => {
            return {
                title: 'Vue Server-SideRendering'
            };
        }
    };
</script>