'use strict';

const message = require('./messages/messages.service.js');
const users = require('./users/users.service.js');

module.exports = function() {
    const app = this;
    app.configure(message);
    app.configure(users);
};
