const express = require('express');
const router = express.Router();

const driversController = require('../controllers/drivers');
const validation = require('../middleware/validateDriver');

router.get('/', driversController.getAll);
router.get('/:id', driversController.getSingle);

router.post('/', validation.saveDriver, driversController.createDriver);
router.put('/:id', validation.saveDriver, driversController.updateDriver);
router.delete('/:id', driversController.deleteDriver);

module.exports = router;