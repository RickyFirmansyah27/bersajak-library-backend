const { checkSchema } = require('express-validator');

const GetBookSchema = checkSchema({
    id: {
        in: ['params'],
        isString: true,
        errorMessage: 'Invalid id',
    },
    page: {
        in: ['query'],
        isInt: true,
        toInt: true,
        errorMessage: 'Invalid page',
        isEmpty: false
    },
});


module.exports = {
    GetBookSchema
}