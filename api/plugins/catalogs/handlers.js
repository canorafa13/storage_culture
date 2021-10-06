const { getAllPermissions } = require('./catalogs');

(() => {
    'use strict';
    const Boom = require('@hapi/boom');

    exports.getAllRoles = async(req, h) => {
        try{
            const roles = await req.server.methods.catalogs.getAllRoles();
            for(let i = 0; i < roles.length; i++){
                roles[i].permissions = await req.server.methods.catalogs.getAllPermissionsByRol(roles[i].id);
            }
            return roles;
        }catch(e){
            throw Boom.notImplemented(JSON.stringify(e));
        }
    }

    exports.getAllPermissions = async(req, h) => {
        try{
            return await req.server.methods.catalogs.getAllPermissions();
        }catch(e){
            throw Boom.notImplemented(JSON.stringify(e));
        }
    }
})();