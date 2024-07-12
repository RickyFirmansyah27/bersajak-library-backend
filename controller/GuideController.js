const GuideService = require('../service/GuideService');
const { Logger } = require('../utils/logger');

const Namespace = 'GuideController';
const WelcomingGuide = async (req, res) => {
    try {
        const { isAudioEnabled, greetings } = req.query;
        let guide;

        if (greetings) {
            guide = await GuideService.GetGreetingsAudio();
        } else {
            guide = await GuideService.GetAudioGuide(isAudioEnabled);
        }

        return res.successWithData(guide);
    } catch (error) {
        Logger.error(
            `[${Namespace}::WelcomingGuide] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const NavigationGuide = async (req, res) => {
    try {
        const guide = await GuideService.GetNavigationGuide();
        return res.successWithData(guide);
    } catch (error) {
        Logger.error(
            `[${Namespace}::NavigationGuide] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const BookListGuide = async (req, res) => {
    try {
        const data = await GuideService.GetBookListAudio();
        return res.successWithData(data);
    } catch (error) {
        Logger.error(
            `[${Namespace}::BookListGuide] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const GamesGuide = async (req, res) => {
    const { type } = req.query;
    try {
        const data = await GuideService.GetGamesGuide(type);
        return res.successWithData(data);
    } catch (error) {
        Logger.error(
            `[${Namespace}::GamesGuide] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const AnswerGuide = async (req, res) => {
    const { type } = req.query;
    try {
        const data = await GuideService.GetAnswerGuide(type);
        return res.successWithData(data);
    } catch (error) {
        Logger.error(
            `[${Namespace}::AnswerGuide] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const ScoreGuide = async (req, res) => {
    const { score } = req.query;
    try {
        const data = await GuideService.GetScoreGuide(score);
        return res.successWithData(data);
    } catch (error) {
        Logger.error(
            `[${Namespace}::ScoreGuide] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const MultipleChoiceGuide = async (req, res) => {
    try {
        const data = await GuideService.GetMultipleChoiceGuide();
        return res.successWithData(data);
    } catch (error) {
        Logger.error(
            `[${Namespace}::MultipleChoiceGuide] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const WordCompletionGuide = async (req, res) => {
    try {
        const data = await GuideService.GetWordCompletionGuide();
        return res.successWithData(data);
    } catch (error) {
        Logger.error(
            `[${Namespace}::WordCompletionGuide] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const GetBookTitleGuide = async (req, res) => {
    const { id } = req.query;
    try {
        const data = await GuideService.GetBookTitleGuide(id);
        return res.successWithData(data);
    } catch (error) {
        Logger.error(
            `[${Namespace}::GetBookTitleGuide] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const GetBookFinishedAudio = async (req, res) => {
    try {
        const data = await GuideService.GetBookFinishedAudio();
        return res.successWithData(data);
    } catch (error) {
        Logger.error(
            `[${Namespace}::GetBookFinishedAudio] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
}

module.exports = {
    WelcomingGuide,
    NavigationGuide,
    BookListGuide,
    GamesGuide,
    AnswerGuide,
    ScoreGuide,
    MultipleChoiceGuide,
    WordCompletionGuide,
    GetBookTitleGuide,
    GetBookFinishedAudio
};
