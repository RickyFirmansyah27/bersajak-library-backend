const { checkSchema } = require('express-validator');

const GetQuizQuestionSchema = checkSchema({
    id: {
        in: ['params'],
        isString: true,
        errorMessage: 'Quiz ID is required',
    },
    number: {
        in: ['query'],
        isInt: true,
        errorMessage: 'Question number is required',
    },
});

const ValidateQuizAnswerSchema = checkSchema({
    id: {
        in: ['params'],
        isString: true,
        errorMessage: 'Quiz ID is required',
    },
    number: {
        in: ['body'],
        isInt: true,
        errorMessage: 'Question number is required',
    },
    answer: {
        in: ['body'],
        isString: true,
        errorMessage: 'Answer is required',
    },
});

module.exports = {
    GetQuizQuestionSchema,
    ValidateQuizAnswerSchema,
};
