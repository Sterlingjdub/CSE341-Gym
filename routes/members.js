const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');
const validation = require('../middleware/validate');

router.get('/', membersController.getMembers);

router.get('/:id', membersController.getMemberById);

router.post('/', validation.saveMember,membersController.createMember);

router.put('/:id', validation.saveMember, membersController.updateMember);

router.delete('/:id', membersController.deleteMember);

module.exports = router;