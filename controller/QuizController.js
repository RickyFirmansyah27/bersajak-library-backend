const { Logger } = require('../utils/logger');
const QuizService = require('../service/QuizService');

const Namespace = 'QuizController';
const GetQuizQuestion = async (req, res) => {
    try {
        const { number } = req.query;
        const { id } = req.params;
        const QuizQuestion = await QuizService.GetQuizQuestion(number, id);

        if (!QuizQuestion?.data) return res.notFound('Quiz question not found');

        return res.successWithData(QuizQuestion.data);
    } catch (error) {
        Logger.error(
            `[${Namespace}::GetQuizQuestion] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const ValidateQuizAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { number, answer } = req.body;
        const isCorrect = await QuizService.ValidateQuizAnswer(number, id, answer.toLowerCase());
        if (!isCorrect) {
            return res.badRequest('Incorrect answer');
        }
        return res.success('Answer Correct');
    } catch (error) {
        Logger.error(
            `[${Namespace}::GetQuizQuestion] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const GetWordCompletionQuestion = (req, res) => {
    try {
        const { number } = req.query;
        const { id } = req.params;
        const QuizQuestion = QuizService.GetWordCompletionQuestion(
            number - 1,
            id
        );

        if (!QuizQuestion) return res.notFound('Quiz question not found');

        return res.successWithPagination(QuizQuestion.data, {
            currentPage: number,
            totalRows: QuizQuestion.totalCount,
        });
    } catch (error) {
        Logger.error(
            `[${Namespace}::GetQuizQuestion] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const ValidateWordCompletionAnswer = (req, res) => {
    try {
        const { id } = req.params;
        const { number, answer } = req.body;
        const isCorrect = QuizService.ValidateWordCompletionAnswer(
            number - 1,
            id,
            answer
        );
        if (!isCorrect) {
            return res.badRequest('Incorrect answer');
        }
        return res.success('Answer Correct');
    } catch (error) {
        Logger.error(
            `[${Namespace}::GetQuizQuestion] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

module.exports = {
    GetQuizQuestion,
    GetWordCompletionQuestion,
    ValidateQuizAnswer,
    ValidateWordCompletionAnswer,
};
