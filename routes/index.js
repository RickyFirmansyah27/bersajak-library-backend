const route = require('express').Router();
const { Logger } = require('../utils/logger');
const QuizRoutes = require('./QuizRoutes');

route.get('/', (req, res) => {
    res.success('Welcome to the Bersajak API');
});

route.use('/quiz', QuizRoutes);

route.use((req, res, next) => {
    res.notFound();
});

route.use((err, req, res, next) => {
    Logger.error(`[Route] error ${err}, stack ${err.stack}`);
    res.internalServerError();
});

module.exports = route;
