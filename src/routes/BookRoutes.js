const route = require('express').Router();
const BookController = require('../controller/BookController');
const { ValidationHandler } = require('../middleware/RequestValidator');
const { GetBookSchema } = require('./schema/BookSchema');

route.get('/list', BookController.GetEbookList)
route.get('/:id', BookController.GetEbookDetail);
route.get('/read/:id', GetBookSchema, ValidationHandler, BookController.GetEbookChunk);

module.exports = route;
