const moment = require('moment');

const GenerateRequestId = () => {
    return `REQ${moment().format('DDMMHHYYss')}`
}

module.exports = { GenerateRequestId };