const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { Logger } = require('./utils/logger');
const HttpLogger = require('./middleware/HttpLoggerMiddleware');
const ResponseMiddleware = require('./middleware/ResponseMiddleware');
const routes = require('./routes');

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(
    cors({
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        origin: '*',
    })
);

app.use(express.json());
app.use(ResponseMiddleware);
app.use(HttpLogger);
app.use(
    // eslint-disable-next-line no-undef
    express.static(path.join(__dirname, 'public'), {
        setHeaders: (res, path) => {
            if (path.endsWith('.mjs')) {
                res.setHeader('Content-Type', 'application/javascript');
            }
        },
    })
);
app.use('/api', routes);
app.listen(port, () => {
    Logger.info('Server is running on port ' + port);
});

process.on('unhandledRejection', (error) => {
    Logger.error('Unhandled Rejection: ' + error.message);
    process.exit(1);
});
