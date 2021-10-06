(() => {
    'use strict';
    const cote = require('cote');

    const requester = new cote.Requester({
        name: 'Catalogs Requester',
        key: 'catalogs_key'
    });

    exports.getAllRoles = async() => {
        try{
            return await requester.send({type: 'getAllRoles'});
        }catch(e){
            throw e;
        }
    }

    exports.getAllPermissions = async() => {
        try{
            return await requester.send({type: 'getAllPermissions'});
        }catch(e){
            throw e;
        }
    }

    exports.getAllPermissionsByRol = async(rol_id) => {
        try{
            return await requester.send({type: 'getAllPermissionsByRol', rol_id});
        }catch(e){
            throw e;
        }
    }
})();