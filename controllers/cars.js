const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all cars
const getAll = async (req, res) => {
    console.log('Handler called'); // Check if the route is hit
    try {
        const db = mongodb.getDb().db();
        const cars = await db.collection('cars').find().toArray(); // Await the database operation
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    } catch (err) {
        console.error('Error fetching cars:', err);
        res.status(500).json({ message: 'Failed to fetch cars' });
    }
};



// Get a single car by ID
/*const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
        }

        const carId = new ObjectId(req.params.id);
        const db = mongodb.getDb().db();
        const car = await db.collection('cars').findOne({ _id: carId }); // Use `findOne` for a single record
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(car);
    } catch (err) {
        console.error('Error fetching car:', err);
        res.status(500).json({ message: 'Failed to fetch the car' });
    }
};*/

const getSingle = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format. Please provide a valid ID with the correct format.' });
        }

        const carId = new ObjectId(id);
        const db = mongodb.getDb().db();
        const car = await db.collection('cars').findOne({ _id: carId });

        // If no car is found, return a 404 response
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json(car);
    } catch (err) {
        console.error(`Error fetching car with ID ${req.params.id}:`, err);
        res.status(500).json({ error: 'Internal Server Error. Failed to fetch the car.' });
    }
};

// Create a new car
/*const createCar = async (req, res) => {
    try {
        const car = {
            make: req.body.make,
            model: req.body.model,
            color: req.body.color,
            numberOfseats: req.body.numberOfseats,
            fuelType: req.body.fuelType
        };

        const db = mongodb.getDb().db();
        const response = await db.collection('cars').insertOne(car); // Await the insertion
        if (response.acknowledged) {
            res.status(201).json({ message: 'Car created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create car' });
        }
    } catch (err) {
        console.error('Error creating car:', err);
        res.status(500).json({ message: 'Failed to create car' });
    }
};*/

const createCar = async (req, res) => {
    try {
        const { make, model, color, numberOfseats, fuelType } = req.body;

        // Validate required fields
        if (!make || !model || !color || !numberOfseats || !fuelType) {
            return res.status(400).json({ error: 'All fields (make, model, color, numberOfseats, fuelType) are required.' });
        }

        // Validate data types
        if (typeof make !== 'string' || typeof model !== 'string' || typeof color !== 'string' || typeof fuelType !== 'string') {
            return res.status(400).json({ error: 'Make, model, color, and fuelType must be strings.' });
        }

        if (typeof numberOfseats !== 'number' || numberOfseats <= 0) {
            return res.status(400).json({ error: 'Number of seats must be a positive number.' });
        }

        const car = { make, model, color, numberOfseats, fuelType };

        const db = mongodb.getDb().db();
        const response = await db.collection('cars').insertOne(car);

        // Check if the insertion was successful
        if (!response.acknowledged) {
            return res.status(500).json({ error: 'Failed to create car. Please try again later.' });
        }

        res.status(201).json({ message: 'Car created successfully', id: response.insertedId });

    } catch (err) {
        console.error('Error creating car:', err, 'Request body:', req.body);
        res.status(500).json({ error: 'Internal Server Error. Failed to create car.' });
    }
};

// Update an existing car
/*const updateCar = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
        }

        const carId = new ObjectId(req.params.id);
        const car = {
            make: req.body.make,
            model: req.body.model,
            color: req.body.color,
            numberOfseats: req.body.numberOfseats,
            fuelType: req.body.fuelType
        };

        const db = mongodb.getDb().db();
        const response = await db.collection('cars').replaceOne({ _id: carId }, car); // Await the replacement
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Car updated successfully' });
        } else {
            res.status(500).json({ message: 'Failed to update car' });
        }
    } catch (err) {
        console.error('Error updating car:', err);
        res.status(500).json({ message: 'Failed to update car' });
    }
};*/

const updateCar = async (req, res) => {
    try {
        // Validate the provided ID
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'The provided ID is invalid. Please provide a valid ID.' });
        }

        const carId = new ObjectId(req.params.id);
        const { make, model, color, numberOfseats, fuelType } = req.body;

        // Validate required fields
        if (!make || !model || !color || !numberOfseats || !fuelType) {
            return res.status(400).json({ error: 'All fields (make, model, color, numberOfseats, fuelType) are required.' });
        }

        // Validate data types
        if (typeof make !== 'string' || typeof model !== 'string' || typeof color !== 'string' || typeof fuelType !== 'string') {
            return res.status(400).json({ error: 'Make, model, color, and fuelType must be strings.' });
        }

        if (typeof numberOfseats !== 'number' || numberOfseats <= 0) {
            return res.status(400).json({ error: 'Number of seats must be a positive number.' });
        }

        const car = { make, model, color, numberOfseats, fuelType };
        const db = mongodb.getDb().db();

        // Check if the car exists before updating
        const existingCar = await db.collection('cars').findOne({ _id: carId });
        if (!existingCar) {
            return res.status(404).json({ error: 'Car not found. Please provide a valid ID.' });
        }

        // Update the car
        const response = await db.collection('cars').replaceOne({ _id: carId }, car);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Car updated successfully' });
        } else {
            res.status(400).json({ error: 'No changes were made. The data might be identical to the existing record.' });
        }
    } catch (err) {
        console.error('Error updating car:', err, 'Request body:', req.body);
        res.status(500).json({ error: 'Internal Server Error. Failed to update car.' });
    }
};

// Delete a car
/*const deleteCar = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
        }

        const carId = new ObjectId(req.params.id);
        const db = mongodb.getDb().db();
        const response = await db.collection('cars').deleteOne({ _id: carId }); // Await the deletion
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Car deleted successfully' });
        } else {
            res.status(500).json({ message: 'Failed to delete car' });
        }
    } catch (err) {
        console.error('Error deleting car:', err);
        res.status(500).json({ message: 'Failed to delete car' });
    }
};*/

const deleteCar = async (req, res) => {
    try {
        // Validate the provided ID
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'The provided ID is invalid. Please provide a valid ID.' });
        }

        const carId = new ObjectId(req.params.id);
        const db = mongodb.getDb().db();

        // Check if the car exists before attempting deletion
        const existingCar = await db.collection('cars').findOne({ _id: carId });
        if (!existingCar) {
            return res.status(404).json({ error: 'Car not found. Please provide a valid ID.' });
        }

        // Perform the deletion
        const response = await db.collection('cars').deleteOne({ _id: carId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Car deleted successfully' });
        } else {
            res.status(500).json({ error: 'Failed to delete car. Please try again later.' });
        }
    } catch (err) {
        console.error('Error deleting car:', err, 'Request Params:', req.params);
        res.status(500).json({ error: 'Internal Server Error. Failed to delete car.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar
};



