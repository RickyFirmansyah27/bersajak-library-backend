const GuideService = require('../service/GuideService');
const { Logger } = require('../utils/logger');

const Namespace = 'GuideController';
const WelcomingGuide = async (req, res) => {
    try {
        const { isAudioEnabled, greetings } = req.query;
        let guide;
    
        if (greetings) {
            guide = await GuideService.GetGreetingsAudio();
        } else if (isAudioEnabled) {
            guide = await GuideService.GetAudioGuide(isAudioEnabled);
        } else {
            return res.badRequest('Invalid request');
        }
    
        return res.successWithData(guide);
    } catch (error) {
        Logger.error(`[${Namespace}::WelcomingGuide] error ${error}, stack ${error.stack}`);
        return res.internalServerError();
    }
};

const NavigationGuide = async (req, res) => {
    try {
        const guide = await GuideService.GetNavigationGuide();
        return res.successWithData(guide);
    } catch (error) {
        Logger.error(`[${Namespace}::NavigationGuide] error ${error}, stack ${error.stack}`);
        return res.internalServerError();
    }
}

module.exports = {
    WelcomingGuide,
    NavigationGuide
};
