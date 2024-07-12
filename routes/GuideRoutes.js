const route = require('express').Router();
const GuideController = require('../controller/GuideController');
const { ValidationHandler } = require('../middleware/RequestValidator');
const { WelcomeGuideSchema } = require('./schema/GuideSchema');

route.get('/home', WelcomeGuideSchema, ValidationHandler, GuideController.WelcomingGuide);
route.get('/navigation', GuideController.NavigationGuide);
route.get('/book-read', GuideController.GetBookTitleGuide);
route.get('/book-finished', GuideController.GetBookFinishedAudio);
route.get('/book-list', GuideController.BookListGuide);
route.get('/games', GuideController.GamesGuide);
route.get('/answer', GuideController.AnswerGuide);
route.get('/multiple-choice', GuideController.MultipleChoiceGuide);
route.get('/word-completion', GuideController.WordCompletionGuide);
route.get('/score', GuideController.ScoreGuide);
route.get('/any', GuideController.AnyGuide)

module.exports = route;