const path = require('path');
const NeDB = require('nedb');

module.exports = function(app) {
    const dbPath = app.get('nedb');
    const Model = new NeDB({
        filename: path.join(dbPath, `messages.json`),
        autoload: true
    });

    return Model;
};
