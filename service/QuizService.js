const { isEmpty } = require('lodash');
const { Logger } = require('../utils/logger');
const db = require('../prisma/client');

const { APP_URL } = process.env;
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
            question_audio_url: true,
            answer: true,
        },
    });

    Logger.info(`[QuizService::GetQuizQuestion] number ${number}, id ${id}`);

    if (isEmpty(question)) {
        return false;
    }

    const transformedOptions = JSON.parse(question.option_list);
    question.options = transformedOptions;
    delete question.option_list;

    const questionAudioUrl = question.question_audio_url ? APP_URL + question.question_audio_url : null;

    return {
        data: {
            ...question,
            question_audio_url: questionAudioUrl,
            log: 'local',
        },
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
    Logger.debug(`[QuizService::ValidateQuizAnswer] answer ${answer} trueAnswer ${question.answer}`)
    const trueAnswer = question.answer;
    return answer === trueAnswer;
};

const GetWordCompletionQuestion = async (number, id) => {
    Logger.info(`[QuizService::GetWordCompletionQuestion] number ${number}, id ${id}`);

    const data = await db.wordCompletion.findFirst({
        where: {
            book_id: parseInt(id),
            number: parseInt(number),
        },
        select: {
            number: true,
            question: true,
            answer: true,
            question_audio_url: true,
        },
    });

    if (isEmpty(data)) {
        return false;
    }

    return {
        data: {
            ...data,
            question_audio_url: APP_URL + data.question_audio_url,
        },
    };
};

const ValidateWordCompletionAnswer = async (number, id, answer) => {
    Logger.info(`[QuizService::ValidateWordCompletionAnswer] number ${number}, id ${id}`);
    const question = await db.wordCompletion.findFirst({
        where: {
            book_id: parseInt(id),
            number: parseInt(number),
        },
        select: {
            answer: true,
        },
    });
    Logger.info(`[QuizService::ValidateWordCompletionAnswer] question ${JSON.stringify(question)}`);
    if (isEmpty(question)) {
        return false;
    }
    const trueAnswer = question.answer.toLowerCase();
    return answer.toLowerCase() === trueAnswer;
};

module.exports = {
    GetQuizQuestion,
    ValidateQuizAnswer,
    GetWordCompletionQuestion,
    ValidateWordCompletionAnswer,
};
