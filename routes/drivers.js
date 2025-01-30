const express = require('express');
const router = express.Router();

const driversController = require('../controllers/drivers');
const { isAuthenticated } = require("../middleware/authenticate");
//const validation = require('../middleware/validateDriver');

router.get('/', driversController.getAll);
router.get('/:id', driversController.getSingle);

//router.post('/', validation.saveDriver, driversController.createDriver);
//router.put('/:id', validation.saveDriver, driversController.updateDriver);
//router.delete('/:id', driversController.deleteDriver);

router.post('/', isAuthenticated, driversController.createDriver);
router.put('/:id', isAuthenticated, driversController.updateDriver);
router.delete('/:id', isAuthenticated, driversController.deleteDriver);

module.exports = router;