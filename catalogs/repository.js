(() => {
    'use strict';
    const config = require('./config');
    const knex = require('knex')(config.production);


    exports.getAllRoles = async() => {
        return await knex('Roles')
            .select('*')
            .then((rows) => {
                return rows;
            })
            .catch((error) => {
                throw error;
            })
    }

    exports.getAllPermissions = async() => {
        return await knex('Permissions')
            .select('*')
            .then((rows) => {
                return rows;
            })
            .catch((error) => {
                throw error;
            })
    }

    exports.getAllPermissionsByRol = async(rol_id) => {
        let sql = `SELECT p.id, p.code, p.description FROM Permissions p, PermissionsByRol pr WHERE p.id = pr.permission_id AND pr.rol_id = ${rol_id}`;

        return await knex.raw(sql)
            .then((rows) => {
                return rows[0];
            })
            .catch((error) => {
                throw error;
            });
    }
    
})();