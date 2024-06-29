const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Gym API',
        description: 'Gym API'
    },
    host: 'cse341-contacts-njqn.onrender.com',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);