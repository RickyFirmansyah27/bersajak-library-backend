const { Logger } = require('../utils/logger');

const RequestLogger = (req, res, next) => {
    const start = new Date();
    const { method, url } = req;
    const request_id = req.request_id; 

    let requestStartLog = `${method} ${url} | request_id: ${request_id}`;
    if (method === 'POST') {
        requestStartLog += ` | payload: ${JSON.stringify(req.body)}`;
    }

    Logger.http(requestStartLog);

    res.on('finish', () => {
        const end = new Date();
        const duration = end - start;
        const { statusCode } = res;
        const responseLog = `${method} ${url} - ${statusCode} - ${duration}ms | request_id: ${request_id}`;

        Logger.http(responseLog);
    });

    next();
};

module.exports = RequestLogger;
