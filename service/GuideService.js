const db = require('../prisma/client');
const { APP_URL } = process.env
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

const GetGreetingsAudio = async () => {
    const greeting = await db.audioGuide.findFirst({
        where: {
            type: 'greeting',
        },
        select: {
            audio_url: true
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
                type: 'enable-audio'
            },
            select: {
                audio_url: true,
            },
        });
    } else {
        audio = await db.audioGuide.findFirst({
            where: {
                type: 'disable-audio'
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
            type: 'book-list'
        },
        select: {
            audio_url: true,
        },
    });

    const audioUrl = APP_URL + audio.audio_url;

    return { audio: audioUrl };
}

module.exports = {
    GetAudioGuide,
    GetGreetingsAudio,
    GetNavigationGuide,
    GetBookListAudio
};
