const { isEmpty } = require('lodash');
const { Logger } = require('../utils/logger');
const MockQuizQuestion = require('../utils/mock/QuizQuestion.json');
const MockWordCompletionQuestion = require('../utils/mock/WordCompletion.json');

const GetQuizQuestion = (number, id) => {
    Logger.info(`[QuizService::GetQuizQuestion] number ${number}, id ${id}`);
    if (isEmpty(MockQuizQuestion)) {
        return false;
    }

    const data = MockQuizQuestion[number];
    delete data.answer;

    return data;
};

const ValidateQuizAnswer = (number, id, answer) => {
    Logger.info(`[QuizService::ValidateQuizAnswer] number ${number}, id ${id}`);
    const question = MockQuizQuestion[number];
    Logger.info(
        `[QuizService::ValidateQuizAnswer] question ${JSON.stringify(question)}`
    );
    if (isEmpty(question)) {
        return false;
    }
    const trueAnswer = question.answer;
    return answer === trueAnswer;
};

const GetWordCompletionQuestion = (number, id) => {
    Logger.info(
        `[QuizService::GetWordCompletionQuestion] number ${number}, id ${id}`
    );

    const data = MockWordCompletionQuestion[number];

    if (isEmpty(data)) {
        return false;
    }

    delete data.answer;

    return data;
};

const ValidateWordCompletionAnswer = (number, id, answer) => {
    Logger.info(
        `[QuizService::ValidateWordCompletionAnswer] number ${number}, id ${id}`
    );
    const question = MockWordCompletionQuestion[number];
    Logger.info(
        `[QuizService::ValidateWordCompletionAnswer] question ${JSON.stringify(
            question
        )}`
    );
    if (isEmpty(question)) {
        return false;
    }
    const trueAnswer = question.answer;
    return answer.toLowerCase() === trueAnswer;
};

module.exports = {
    GetQuizQuestion,
    ValidateQuizAnswer,
    GetWordCompletionQuestion,
    ValidateWordCompletionAnswer
};
