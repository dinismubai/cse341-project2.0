/*const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = router;*/

const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Serve the Swagger UI
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Alternatively, if you need to specifically serve swagger.json:
router.get('/swagger.json', (req, res) => {
    res.json(swaggerDocument);
});

module.exports = router;