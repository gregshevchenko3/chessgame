import Vue from 'vue'
import Vuex from 'vuex'

export function createStore(state){
    return new Vuex.Store({
        state,
        getters: {
            user: state => state.user,
            needAuthorization: state => (state.user == false)
        },
        actions: {
            getUser({commit}){
                return Promise.resolve(false).then(us => {
                    commit('setUser', us);
                });
            }
        },
        mutations: {
            setUser: (state, user) => state.user = user,
        }
    });
}