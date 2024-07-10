const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getMembers = async (req, res) => {
    const result = await mongodb.getDb().db().collection('Members').find();
    result.toArray().then((err, lists) => {
        if (err) {
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getMemberById = async (req, res) => {
    try {
        const memberId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('Members').find({_id:memberId});
        if (!result) {
            return res.status(404).json({message: "Member not found"});
        }
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (error) {
        console.error("Error getting member by ID:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

const createMember = async (req, res) => {
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
};

const updateMember = async (req, res) => {
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
    const response = await mongodb.getDb().db().collection('Members').replaceOne({_id:memberId}, member);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the member.');
    };
};

const deleteMember = async (req, res) => {
    const memberId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('Members').deleteOne({_id:memberId}, true);
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while deleting the member.');
    };
};

module.exports = {
    getMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};