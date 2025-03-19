const { checkSchema } = require("express-validator");

const WelcomeGuideSchema = checkSchema({
    isAudioEnabled: {
        in: ['query'],
        isBoolean: true,
        optional: true,
        toBoolean: true
    },
    greetings : {
        in: ['query'],
        isString: true,
        optional: true
    }
});

module.exports = {
    WelcomeGuideSchema,
}