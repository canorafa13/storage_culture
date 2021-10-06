(() => {
    'use strict';

    const Joi = require('joi');
    const users = require('./users');
    const handlers = require('./handlers');

    const plugin = {
        name: "users",
        version: '1.0.0',
        register: async (server, options) => {
            server.route([{
                method: 'GET',
                path: '/users',
                handler: handlers.getAll,
                options: {
                    description: 'All users',
                    notes: 'All users',
                    tags: ['api', 'users']
                }
            }, {
                method: 'POST',
                path: '/user',
                handler: handlers.insert,
                options: {
                    description: 'Create new user',
                    notes: 'Create new user',
                    tags: ['api', 'users', 'new', 'insert'],
                    validate: {
                        payload: Joi.object({
                            username: Joi.string().required().max(40),
                            password: Joi.string().required().max(40),
                            name: Joi.string().required().max(100),
                            last_name: Joi.string().required().max(150),
                            phone: Joi.string().max(12).allow(null),
                            rol_id: Joi.number().required().min(1)
                        })
                    }
                }
            }]);


            server.method([{
                name: 'users.getAll',
                method: users.getAll
            }, {
                name: 'users.insert',
                method: users.insert
            }]);
        }
    }


    module.exports = plugin;
})();