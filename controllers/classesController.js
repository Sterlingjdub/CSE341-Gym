const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getClasses = async (req, res) => {
    const result = await mongodb.getDb().db().collection('Classes').find();
    result.toArray().then((err, lists) => {
        if (err) {
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getClassById = async (req, res) => {
    try {
        const classId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('Classes').find({_id:classId});
        if (!result) {
            return res.status(404).json({message: "Class not found"});
        }
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (error) {
        console.error("Error getting class by ID:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

const createClass = async (req, res) => {
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
};

const udpateClass = async (req, res) => {
    const classId = new ObjectId(req.params.id);
    const fitnessClass = {
        className: req.body.className,
        instructor: req.body.instructor,
        schedule: req.body.schedule,
        duration: req.body.duration,
        capacity: req.body.capacity,
        location: req.body.location
    };
    const response = await mongodb.getDb().db().collection('Classes').replaceOne({_id:classId}, fitnessClass);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the class.');
    };
};

const deleteClass = async (req, res) => {
    const classId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('Classes').deleteOne({_id:classId}, true);
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while deleting the class.');
    };
};

module.exports = {
    getClasses,
    getClassById,
    createClass,
    udpateClass,
    deleteClass
};