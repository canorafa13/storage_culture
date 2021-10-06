(() => {
    'use strict';
    
    const catalogs = require('./catalogs');
    const handlers = require('./handlers');

    const plugin = {
        name: "catalogs",
        version: '1.0.0',
        register: async (server, options) => {
            server.route([{
                method: 'GET',
                path: '/roles',
                handler: handlers.getAllRoles,
                options: {
                    description: 'All roles',
                    notes: 'All roles',
                    tags: ['api', 'roles']
                }
            }, {
                method: 'GET',
                path: '/permissions',
                handler: handlers.getAllPermissions,
                options: {
                    description: 'All permissions',
                    notes: 'All permissions',
                    tags: ['api', 'permissions']
                }
            }]);


            server.method([{
                name: 'catalogs.getAllRoles',
                method: catalogs.getAllRoles
            }, {
                name: 'catalogs.getAllPermissions',
                method: catalogs.getAllPermissions
            }, {
                name: 'catalogs.getAllPermissionsByRol',
                method: catalogs.getAllPermissionsByRol
            }]);
        }
    }


    module.exports = plugin;
})();