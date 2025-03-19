const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { Logger } = require('./utils/logger');
const db = require('../prisma/client');
const HttpLogger = require('./middleware/HttpLoggerMiddleware');
const ResponseMiddleware = require('./middleware/ResponseMiddleware');
const routes = require('./routes');

const app = express();
const port = process.env.APP_PORT || 3000;

// Middleware
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
    '/assets',
    // eslint-disable-next-line no-undef
    express.static(path.join(__dirname, 'assets'), {
        setHeaders: (res, path) => {
            if (path.endsWith('.mjs')) {
                res.setHeader('Content-Type', 'application/javascript');
            }
        },
    })
);

// Route untuk root (/)
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Bersajak Library Backend!',
        status: 'running',
        port: port,
    });
});

// API Routes
app.use('/api', routes);

// Middleware untuk menangani 404 (Route not found)
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
    });
});

// Start server
app.listen(port, async () => {
    try {
        await db.$connect();
        Logger.info('Server is running on port ' + port);
    } catch (error) {
        Logger.error('Failed to connect to database: ' + error.message);
        process.exit(1);
    }
});

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
    Logger.error('Unhandled Rejection: ' + error.message);
    process.exit(1);
});
