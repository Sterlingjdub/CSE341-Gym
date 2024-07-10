const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/', require('./swagger'));
//router.get('/', (req, res) => (res.send('Gym Database')));
router.use('/profile', requiresAuth(), require('./profile'));
router.use('/members', requiresAuth(), require('./members'));
router.use('/classes', requiresAuth(), require('./classes'));

module.exports = router;