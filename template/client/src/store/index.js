import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as types from './mutation-types';

Vue.use(Vuex);

const state = {
    messages: [],
    authenticated: false,
    user: {},
    errors: {
        authentication: null
    }
};

const mutations = {
    [types.FETCH_MESSAGES](state, messages) {
        state.messages = messages;
    },
    [types.ADD_MESSAGE](state, message) {
        state.messages.push(message);
    },
    [types.UPDATE_USER](state, user) {
        if (user === null) {
            state.user = null;
            state.authenticated = false;
        } else {
            state.user = user;
            state.authenticated = true;
        }
    },
    [types.ADD_ERROR](state, data) {
        state.errors[data.type] = data.err;
    },
    [types.REMOVE_ERROR](state, type) {
        state.errors[type] = null;
    }
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});
