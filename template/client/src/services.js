import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';
import {signin} from './store/actions';

const socket = io('http://bella.tardis:3030/');
export const app = feathers().configure(socketio(socket)).configure(hooks()).configure(authentication({
    storage: window.localStorage,
    path: '/authentication',
    storageKey: 'feathers-jwt'
}));

// Handle when auth fails during a reconnect or a transport upgrade
app.on('reauthentication-error', () => {
    signin();
});

// Get the message service that uses a websocket connection
export const messageService = app.service('messages');
export const userService = app.service('users');
