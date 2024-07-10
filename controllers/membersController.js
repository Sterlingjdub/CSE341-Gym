const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getMembers = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('Members').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getMemberById = async (req, res) => {
    try {
        const memberId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('Members').findOne({ _id: memberId });
        if (!result) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error getting member by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createMember = async (req, res) => {
    try {
        const member = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            membershipType: req.body.membershipType,
            startDate: req.body.startDate
        };
        const response = await mongodb.getDb().db().collection('Members').insertOne(member);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the member.');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMember = async (req, res) => {
    try {
        const memberId = new ObjectId(req.params.id);
        const member = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            membershipType: req.body.membershipType,
            endDate: req.body.endDate
        };
        const response = await mongodb.getDb().db().collection('Members').replaceOne({ _id: memberId }, member);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the member.');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMember = async (req, res) => {
    try {
        const memberId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('Members').deleteOne({ _id: memberId });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while deleting the member.');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};
