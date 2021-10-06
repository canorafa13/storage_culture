(() => {
    'use strict';

    const cote = require('cote');
    const repository = require('./repository');

    const responder = new cote.Responder({
        name: 'Users Responder',
        key: 'users_key'
    });

    responder.on('getAll', async () => await repository.getAll());
    responder.on('insert', async (req) => await repository.insert(req.payload));
})();