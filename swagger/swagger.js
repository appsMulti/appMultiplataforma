const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Proyecto de gestión de escuelas/facultades',
            version: '1.0.0',
            description: 'Aplicación web  para gestión de alumnos, profesores, entidades, asignaturas y planteles',
            contact: {
                name: 'Equipo zip'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            }
        ]
    },
    apis: ['./swagger/*.yml']  
};

const specs = swaggerJsdoc(options);
module.exports = specs;
