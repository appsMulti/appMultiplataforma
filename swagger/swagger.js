const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Proyecto de gestión de escuelas/facultades',
        version: '1.0.0',
        description: 'Aplicación web para gestión de alumnos, profesores, entidades, asignaturas y planteles',
        contact: {
            name: 'Equipo zip'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local'
        }
    ],
    paths: {},
    components: { schemas: {} }
};

const ymlFiles = ['alumno', 'profesor', 'entidad_federativa', 'asignatura', 'plantel'];

ymlFiles.forEach(file => {
    const filePath = path.join(__dirname, `${file}.yml`);
    const doc = yaml.load(fs.readFileSync(filePath, 'utf8'));

    if (doc.paths) {
        Object.assign(swaggerDocument.paths, doc.paths);
    }

    if (doc.components && doc.components.schemas) {
        Object.assign(swaggerDocument.components.schemas, doc.components.schemas);
    }
});

module.exports = swaggerDocument;