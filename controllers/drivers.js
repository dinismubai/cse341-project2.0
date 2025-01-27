const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all drivers
const getAll = async (req, res) => {
    console.log('Handler called'); // Check if the route is hit
    try {
        const db = mongodb.getDb().db();
        const drivers = await db.collection('drivers').find().toArray(); // Await the database operation
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(drivers);
    } catch (err) {
        console.error('Error fetching drivers:', err);
        res.status(500).json({ message: 'Failed to fetch drivers' });
    }
};

// Get a single driver by ID
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
        }

        const driverId = new ObjectId(req.params.id);
        const db = mongodb.getDb().db();
        const driver = await db.collection('drivers').findOne({ _id: driverId }); // Use `findOne` for a single record
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(driver);
    } catch (err) {
        console.error('Error fetching driver:', err);
        res.status(500).json({ message: 'Failed to fetch the driver' });
    }
};

// Create a new driver
const createDriver = async (req, res) => {
    try {
        const driver = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            yearsDriving: req.body.yearsDriving,
            email: req.body.email,
            phone: req.body.phone,
            licenseNumber: req.body.licenseNumber
        };

        const db = mongodb.getDb().db();
        const response = await db.collection('drivers').insertOne(driver); // Await the insertion
        if (response.acknowledged) {
            res.status(201).json({ message: 'Driver created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create driver' });
        }
    } catch (err) {
        console.error('Error creating driver:', err);
        res.status(500).json({ message: 'Failed to create driver' });
    }
};

// Update an existing driver
const updateDriver = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
        }

        const driverId = new ObjectId(req.params.id);
        const driver = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            yearsDriving: req.body.yearsDriving,
            email: req.body.email,
            phone: req.body.phone,
            licenseNumber: req.body.licenseNumber
        };

        const db = mongodb.getDb().db();
        const response = await db.collection('drivers').replaceOne({ _id: driverId }, driver); // Await the replacement
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Driver updated successfully' });
        } else {
            res.status(500).json({ message: 'Failed to update driver' });
        }
    } catch (err) {
        console.error('Error updating driver:', err);
        res.status(500).json({ message: 'Failed to update driver' });
    }
};

// Delete a driver
const deleteDriver = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('The provided ID is invalid. Please provide a valid ID.');
        }

        const driverId = new ObjectId(req.params.id);
        const db = mongodb.getDb().db();
        const response = await db.collection('drivers').deleteOne({ _id: driverId }); // Await the deletion
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Driver deleted successfully' });
        } else {
            res.status(500).json({ message: 'Failed to delete driver' });
        }
    } catch (err) {
        console.error('Error deleting driver:', err);
        res.status(500).json({ message: 'Failed to delete driver' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createDriver,
    updateDriver,
    deleteDriver
};



