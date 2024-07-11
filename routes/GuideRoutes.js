const route = require('express').Router();
const GuideController = require('../controller/GuideController');
const { ValidationHandler } = require('../middleware/RequestValidator');
const { WelcomeGuideSchema } = require('./schema/GuideSchema');

route.get('/home', WelcomeGuideSchema, ValidationHandler, GuideController.WelcomingGuide);
route.get('/navigation', GuideController.NavigationGuide);
route.get('/book-list', GuideController.BookListGuide);

module.exports = route;