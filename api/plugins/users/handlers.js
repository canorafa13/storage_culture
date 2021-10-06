(() => {
    'use strict';
    const Boom = require('@hapi/boom');
    const _ = require('underscore');
    
    let _roles = null;

    const init = async (server) => {
        if(_roles == null){
            _roles = await server.methods.catalogs.getAllRoles();
        }
    }

    exports.getAll = async(req, h) => {
        try{
            await init(req.server);
            const users = await req.server.methods.users.getAll();
            for(let i = 0; i < users.length; i++){
                users[i].rol = _roles[_.findIndex(_roles, {id: users[i].rol_id})];
                users[i].rol.permissions = await req.server.methods.catalogs.getAllPermissionsByRol(users[i].rol.id);
                delete users[i].rol_id;
            }
            return users;
        }catch(e){
            throw Boom.notImplemented(JSON.stringify(e));
        }
    }

    exports.insert = async(req, h) => {
        try{
            return await req.server.methods.users.insert(req.payload);
        }catch(e){
            throw Boom.notImplemented(JSON.stringify(e));
        }
    }

    exports.signon = async(req, h) => {
        try{
            return await req.server.methods.users.signon(req.payload.username, req.payload.password);
        }catch(e){
            throw Boom.notImplemented(JSON.stringify(e));
        }
    }
})();