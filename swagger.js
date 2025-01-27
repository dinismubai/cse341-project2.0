const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Cars and Drivers API',
        description: 'Cars and Drivers'
    },
    host: 'localhost:3001',
    schemas: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);