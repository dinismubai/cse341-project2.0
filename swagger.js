const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Cars and Drivers API',
        description: 'Cars and Drivers'
    },
    host: 'localhost:3002',
    schemas: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);