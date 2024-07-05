const route = require('express').Router();
const BookController = require('../controller/BookController');
const { ValidationHandler } = require('../middleware/RequestValidator');
const { GetBookSchema } = require('./schema/BookSchema');

route.get(
    '/:id',
    GetBookSchema,
    ValidationHandler,
    BookController.GetEbookChunk
);

module.exports = route;
