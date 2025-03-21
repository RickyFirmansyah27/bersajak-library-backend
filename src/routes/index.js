const route = require('express').Router();
const { Logger } = require('../utils/logger');
const QuizRoutes = require('./QuizRoutes');
const BookRoutes = require('./BookRoutes');
const AudioRoutes = require('./AudioRoutes');
const GuideRoutes = require('./GuideRoutes');

route.get('/', (req, res) => {
    res.success('Welcome to the Bersajak API');
});

route.use('/quiz', QuizRoutes);
route.use('/book', BookRoutes);
route.use('/guide', GuideRoutes)
route.use('/audio', AudioRoutes);

route.use((_, res, __) => {
    res.notFound();
});

route.use((err, _, res, __) => {
    Logger.error(`[Route] error ${err}, stack ${err.stack}`);
    res.internalServerError();
});

module.exports = route;
