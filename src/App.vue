<template>
    <div id="app">
        <header>
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-brand href="#">NavBar</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">Link</b-nav-item>
                        <b-nav-item href="#" disabled>Disabled</b-nav-item>
                    </b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-form>
                            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                        </b-nav-form>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </header> 
        <div v-if="user"> {{user.username}} </div>
        <section>
            <b-modal id="modal-1" title="Authorization" v-model="needAuthorization">
                
            </b-modal>
        </section>
    </div>
</template>
<script>
    import Vue from 'vue';
    //import 'gapi';
    import {mapGetters} from 'vuex';
    import {
        BDropdownItem, 
        BNavItemDropdown, 
        BNavForm, 
        BFormInput,
        BButton,
        BNavbarNav,
        BNavItem,
        BNavbar, 
        BNavbarBrand, 
        BNavbarToggle, 
        BCollapse,
        BModal
    } from 'bootstrap-vue';
    Vue.component('b-navbar', BNavbar)
    Vue.component('b-navbar-brand', BNavbarBrand);
    Vue.component('b-navbar-toggle', BNavbarToggle);
    Vue.component('b-collapse', BCollapse);
    Vue.component('b-dropdown-item', BDropdownItem);
    Vue.component('b-form-input', BFormInput);
    Vue.component('b-button', BButton);
    Vue.component('b-nav-form', BNavForm);
    Vue.component('b-nav-item-dropdown', BNavItemDropdown);
    Vue.component('b-navbar-nav', BNavbarNav);
    Vue.component('b-nav-item', BNavItem);
    Vue.component('b-modal', BModal)
    
    export default {
        name: 'App',
        metaInfo: {
            meta: [
                { charset: 'utf-8' },
                { title: 'Server-Side Rendering'},
            ]
        },
        computed: {
            ...mapGetters({
                user: 'user',
                needAuthorization: 'needAuthorization',
            })
        },
        mounted () {
            if (!this.user) this.fetchUser()
        },
        serverPrefetch () {
            return this.fetchUser();
        },
        methods: {
            fetchUser(){
                return this.$store.dispatch('getUser');
            },
        }
    };
</script>