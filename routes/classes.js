const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classesController');
const validation = require('../middleware/validate');

router.get('/', classesController.getClasses);

router.get('/:id', classesController.getClassById);

router.post('/', validation.saveClass,classesController.createClass);

router.put('/:id', validation.saveClass, classesController.updateClass);

router.delete('/:id', classesController.deleteClass);

module.exports = router;