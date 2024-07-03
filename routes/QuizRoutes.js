const route = require('express').Router();
const QuizController = require('../controller/QuizController');
const { ValidationHandler } = require('../middleware/RequestValidator');
const { GetQuizQuestionSchema, ValidateQuizAnswerSchema } = require('./schema/QuizSchema');

route.get('/multiple-choice/:id', GetQuizQuestionSchema, ValidationHandler, QuizController.GetQuizQuestion);
route.post('/multiple-choice/:id', ValidateQuizAnswerSchema, ValidationHandler, QuizController.ValidateQuizAnswer);
route.get('/word-completion/:id', GetQuizQuestionSchema, ValidationHandler, QuizController.GetWordCompletionQuestion);
route.post('/word-completion/:id', ValidateQuizAnswerSchema, ValidationHandler, QuizController.ValidateWordCompletionAnswer);
module.exports = route;
