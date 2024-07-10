const routes = require('express').Router();
const profileController = require('../controllers/profileController');
const { requiresAuth } = require('express-openid-connect');

routes.get('/', requiresAuth(), profileController.getProfile);

module.exports = routes;