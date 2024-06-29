const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => (res.send('Gym Database')));
router.use('/contacts', require('./contacts'));

module.exports = router;