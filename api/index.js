(() => {
    'use strict';

    const Hapi = require('@hapi/hapi');
    const prefix = "/storage-culture/api/v1"
    
    const init = async () => {
        console.log("POST", process.env.PORT)
        const server = Hapi.server({
            port: process.env.PORT,
            host: '0.0.0.0'
        });

        const swaggerOptions = {
            info: {
                title: 'Storage Culture API Documentation',
                version: "1.0.0"
            },
            basePath: prefix
        };

        await server.register([
            {
                plugin: require('@hapi/inert')
            }, {
                plugin: require("@hapi/vision")
            }, {
                plugin: require('hapi-swagger'),
                options: swaggerOptions
            }, {
                plugin: require('hapi-cors'),
                options: {
                    methods: ['POST', 'GET', 'PUT', 'DELETE']
                }
            }
        ])


        await server.start();
        console.log('Server running on %s', server.info.uri);
    };
    
    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });
    
    init();  
})();