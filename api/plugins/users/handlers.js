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

    exports.test = (req, h) => {
        return {
          "code": 200,
          "success": true,
          "s3": null,
          "items": [
            {
              "fichaTecnica": {
                "url": "https://www.gob.mx/cms/uploads/attachment/file/35735/cdi-regiones-indigenas-mexico.pdf",
                "formato": "PDF"
              }
            }
          ],
          "message": {
            "id": 9,
            "short_description": "Exito",
            "long_description": "Operación realizada con éxito",
            "code": "200"
          },
          "url": ""
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