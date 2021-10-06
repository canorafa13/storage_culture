(() => {
    'use strict';
    const config = require('./config');
    const knex = require('knex')(config.production);


    exports.getAll = async() => {
        return await knex('Users')
            .select('username', 'name', 'last_name', 'phone', 'url_profile', 'status', 'rol_id')
            .then((rows) => {
                return rows;
            })
            .catch((error) => {
                throw error;
            });
    }

    exports.insert = async(payload) => {
        return await knex('Users')
            .insert(payload)
            .then((rows) => {
                return rows;
            })
            .catch((error) => {
                throw error;
            });
    }
})();