const { isEmpty } = require('lodash');
const { Logger } = require('../utils/logger');
const db = require('../prisma/client');
const MockWordCompletionQuestion = require('../utils/mock/WordCompletion.json');

const GetQuizQuestion = async (number, id) => {
    const question = await db.quiz.findFirst({
        where: {
            book_id: parseInt(id),
            number: parseInt(number),
        },
        select: {
            number: true,
            question: true,
            option_list: true,
        },
    });

    Logger.info(`[QuizService::GetQuizQuestion] number ${number}, id ${id}`);

    if (isEmpty(question)) {
        return false;
    }

    const transformedOptions = JSON.parse(question.option_list);
    question.options = transformedOptions;
    delete question.option_list;

    return {
        data: question,
    };
};

const ValidateQuizAnswer = async (number, id, answer) => {
    Logger.info(`[QuizService::ValidateQuizAnswer] number ${number}, id ${id}`);
    const question = await db.quiz.findFirst({
        where: {
            book_id: parseInt(id),
            number: parseInt(number),
        },
        select: {
            answer: true,
        },
    });
    if (isEmpty(question)) {
        return false;
    }
    Logger.info(
        `[QuizService::ValidateQuizAnswer] question ${JSON.stringify(question)}`
    );
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

    const totalCount = MockWordCompletionQuestion.length;

    delete data.answer;

    return {
        data,
        totalCount,
    };
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
    ValidateWordCompletionAnswer,
};
