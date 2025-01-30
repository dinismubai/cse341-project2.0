const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');
const { isAuthenticated } = require("../middleware/authenticate");
//const validation = require('../middleware/validateCar');

router.get('/', carsController.getAll);
router.get('/:id', carsController.getSingle);

//router.post('/', validation.saveCar, carsController.createCar);
//router.put('/:id', validation.saveCar, carsController.updateCar);
//router.delete('/:id', carsController.deleteCar);
router.post('/', isAuthenticated, carsController.createCar);
router.put('/:id', isAuthenticated, carsController.updateCar);
router.delete('/:id', isAuthenticated, carsController.deleteCar);

module.exports = router;