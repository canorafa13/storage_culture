(() => {
    'use strict';

    const cote = require('cote');
    const repository = require('./repository');

    const responder = new cote.Responder({
        name: 'Catalogs Responder',
        key: 'catalogs_key'
    });

    responder.on('getAllRoles', async () => await repository.getAllRoles());
    responder.on('getAllPermissions', async () => await repository.getAllPermissions());
    responder.on('getAllPermissionsByRol', async (payload) => await repository.getAllPermissionsByRol(payload.rol_id));
})();