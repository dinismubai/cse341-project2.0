const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World')
});

router.use('/cars', require('./cars'));
router.use('/drivers', require('./drivers'));

module.exports = router; 