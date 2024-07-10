const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getClasses = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('Classes').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getClassById = async (req, res) => {
    try {
        const classId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('Classes').findOne({ _id: classId });
        if (!result) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error getting class by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createClass = async (req, res) => {
    try {
        const fitnessClass = {
            className: req.body.className,
            instructor: req.body.instructor,
            schedule: req.body.schedule,
            duration: req.body.duration,
            capacity: req.body.capacity,
            location: req.body.location
        };
        const response = await mongodb.getDb().db().collection('Classes').insertOne(fitnessClass);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the class.');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateClass = async (req, res) => {
    try {
        const classId = new ObjectId(req.params.id);
        const fitnessClass = {
            className: req.body.className,
            instructor: req.body.instructor,
            schedule: req.body.schedule,
            duration: req.body.duration,
            capacity: req.body.capacity,
            location: req.body.location
        };
        const response = await mongodb.getDb().db().collection('Classes').replaceOne({ _id: classId }, fitnessClass);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the class.');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteClass = async (req, res) => {
    try {
        const classId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('Classes').deleteOne({ _id: classId });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while deleting the class.');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass
};