const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Cars and Drivers API',
        description: 'Cars and Drivers'
    },
    host: 'cse341-node-zjc2.onrender.com',
    schemas: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);