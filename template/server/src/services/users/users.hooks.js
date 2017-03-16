'use strict';

const {authenticate} = require('feathers-authentication').hooks;
const {unless} = require('feathers-hooks-common');
const {hashPassword} = require('feathers-authentication-local').hooks;
const {checkPermissions, setPermissions, isPermitted} = require('feathers-permissions').hooks;

module.exports = {
    before: {
        all: [
            // call the authenticate hook before every method except 'create'
            // unless(hook => hook.method === 'create', authenticate('jwt'))
            unless(hook => hook.method === 'create', () => {
                authenticate('jwt');
                checkPermissions({service: 'users'});
                isPermitted();
            })
        ],
        find: [],
        get: [],
        create: [hashPassword()],
        update: [],
        patch: [],
        remove: []
    },
    after: {
        all: [],
        find: [],
        get: [],
        create: [
            // update the user with the appropriate permissions
            setPermissions({permissions: ['users:*:id']})
        ],
        update: [],
        patch: [],
        remove: []
    },
    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
