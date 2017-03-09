import {app, messageService} from '../services';
import * as types from './mutation-types';

export const fetchMessages = function({commit}) {
    // Call the messages service on the server via websocket
    messageService.find({}).then(result => {
        commit(types.FETCH_MESSAGES, result.data);
    });
};

export const addMessage = function({commit}, text) {
    messageService.create({text}).then(result => {
        commit(types.ADD_MESSAGE, result);
    });
};

export const signin = function({commit}, text) {
    commit(types.IS_LOADING, true);
    let params = text ? {
        strategy: 'local',
        email: text.username,
        password: text.password
    } : {};
    app.authenticate(params).then(response => {
        return app.passport.verifyJWT(response.accessToken);
    }).then(payload => {
        return app.service('users').get(payload.userId);
    }).then(user => {
        app.set('user', user);
        commit(types.UPDATE_USER, user);
        commit(types.REMOVE_ERROR, 'authentication');
        return new Promise(function(resolve) {
            resolve(user);
            commit(types.IS_LOADING, false);
        });
    }).catch(err => {
        // Make sure we're actually trying to login with something
        // If we don't have a JWT and no strategy was set then this was probably from the App.vue when it first loads
        if (params !== {} && err.message !== 'Could not find stored JWT and no authentication strategy was given') {
            console.log('setting an error');
            app.set('user', null);
            commit(types.UPDATE_USER, null);
            commit(types.ADD_ERROR, {
                type: 'authentication',
                err
            });
        }
        commit(types.IS_LOADING, false);
    });
};

export const signout = function({commit}) {
    app.logout();
    commit(types.UPDATE_USER, null);
    commit(types.REMOVE_ERROR, 'authentication');
};
