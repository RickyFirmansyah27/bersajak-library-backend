const db = require('../../prisma/client');
const { Logger } = require('../utils/logger');
const { APP_URL } = process.env;
const GetNavigationGuide = async () => {
    const navigation = await db.audioGuide.findFirst({
        where: {
            type: 'navigation',
        },
        select: {
            audio_url: true,
        },
    });
    const audioUrl = APP_URL + navigation.audio_url;
    return { audio: audioUrl };
};

const GetEnableAudioOptions = async () => {
    const audio = await db.audioGuide.findFirst({
        where: {
            type: 'audio-options',
        },
        select: {
            audio_url: true,
        },
    });

    const audioUrl = APP_URL + audio.audio_url;
    return { audio: audioUrl };
}

const GetGreetingsAudio = async () => {
    const greeting = await db.audioGuide.findFirst({
        where: {
            type: 'greeting',
        },
        select: {
            audio_url: true,
        },
    });

    const audioUrl = APP_URL + greeting.audio_url;
    return { audio: audioUrl };
};

const GetAudioGuide = async (isAudioEnabled) => {
    let audio;
    if (isAudioEnabled) {
        audio = await db.audioGuide.findFirst({
            where: {
                type: 'enable-audio',
            },
            select: {
                audio_url: true,
            },
        });
    } else {
        audio = await db.audioGuide.findFirst({
            where: {
                type: 'disable-audio',
            },
            select: {
                audio_url: true,
            },
        });
    }

    const audioUrl = APP_URL + audio.audio_url;

    return { audio: audioUrl };
};

const GetBookListAudio = async () => {
    const audio = await db.audioGuide.findFirst({
        where: {
            type: 'book-list',
        },
        select: {
            audio_url: true,
        },
    });

    const audioUrl = APP_URL + audio.audio_url;

    return { audio: audioUrl };
};

const GetGamesGuide = async (type) => {
    let data;
    if (type === 'intro') {
        data = await db.audioGuide.findFirst({
            where: {
                type: 'game-start',
            },
            select: {
                audio_url: true,
            },
        });
    } else {
        data = await db.audioGuide.findFirst({
            where: {
                type: 'game-over',
            },
            select: {
                audio_url: true,
            },
        });
    }
    const audioUrl = APP_URL + data.audio_url;
    return audioUrl;
};

const GetAnswerGuide = async (type) => {
    let data;
    if (type === 'correct') {
        data = await db.audioGuide.findFirst({
            where: {
                type: 'answer-correct',
            },
            select: {
                audio_url: true,
            },
        });
    } else {
        data = await db.audioGuide.findFirst({
            where: {
                type: 'answer-incorrect',
            },
            select: {
                audio_url: true,
            },
        });
    }
    const audioUrl = APP_URL + data.audio_url;
    return audioUrl;
};

const GetScoreGuide = async (score) => {
    const data = await db.audioGuide.findFirst({
        where: {
            type: `score-${score}`,
        },
        select: {
            audio_url: true,
        },
    });
    const audioUrl = APP_URL + data.audio_url;
    return audioUrl;
}

const GetMultipleChoiceGuide = async () => {
    const data = await db.audioGuide.findFirst({
        where: {
            type: 'multiple-choice-start',
        },
        select: {
            audio_url: true,
        },
    });
    const audioUrl = APP_URL + data.audio_url;
    return audioUrl;
}

const GetWordCompletionGuide = async () => {
    const data = await db.audioGuide.findFirst({
        where: {
            type: 'word-completion-start',
        },
        select: {
            audio_url: true,
        },
    });
    const audioUrl = APP_URL + data.audio_url;
    return audioUrl;
};

const GetBookTitleGuide = async (id) => {
    const data = await db.audioGuide.findFirst({
        where: {
            type: `read-book-id-${id}`,
        },
        select: {
            audio_url: true,
        },
    });
    if (!data) {
        return null;
    }
    const audioUrl = APP_URL + data.audio_url;
    return audioUrl;
}

const GetBookFinishedAudio = async () => {
    const data = await db.audioGuide.findFirst({
        where: {
            type: 'book-finished',
        },
        select: {
            audio_url: true,
        },
    });
    const audioUrl = APP_URL + data.audio_url;
    return audioUrl;
};

const GetAnyGuide = async (type) => {
    const data = await db.audioGuide.findFirst({
        where: {
            type: type,
        },
        select: {
            audio_url: true,
        },
    });
    const audioUrl = APP_URL + data.audio_url;
    return audioUrl;
}

module.exports = {
    GetAudioGuide,
    GetGreetingsAudio,
    GetNavigationGuide,
    GetBookListAudio,
    GetGamesGuide,
    GetAnswerGuide,
    GetScoreGuide,
    GetMultipleChoiceGuide,
    GetWordCompletionGuide,
    GetBookTitleGuide,
    GetBookFinishedAudio,
    GetAnyGuide,
    GetEnableAudioOptions
};
