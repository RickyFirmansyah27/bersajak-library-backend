const { GenerateRequestId } = require('../utils/helpers');
const ResponseMiddleware = (req, res, next) => {
    req.request_id = GenerateRequestId();

    res.success = (message = null) => {
        return res.status(200).json({
            status: true,
            request_id: req.request_id,
            message: message || 'Success',
        });
    };

    res.successWithData = (data, message = null) => {
        return res.status(200).json({
            status: true,
            request_id: req.request_id,
            message: message || 'Success',
            data: data
        });
    };

    res.successWithPagination = (data, pagination, message = null) => {
        return res.status(200).json({
            status: true,
            request_id: req.request_id,
            message: message || 'Success',
            data: data,
            pagination: pagination,
        });
    }

    res.created = (message = null) => {
        return res.status(201).json({
            status: true,
            request_id: req.request_id,
            message: message || 'Success',
        });
    };

    res.createdWithData = (data, message = null) => {
        return res.status(201).json({
            status: true,
            request_id: req.request_id,
            message: message || 'Success',
            data: data,
        });
    };

    res.badRequest = (message = null) => {
        return res.status(400).json({
            status: false,
            request_id: req.request_id,
            message: message || 'Bad Request',
        });
    };

    res.notFound = (message = null) => {
        return res.status(404).json({
            status: false,
            request_id: req.request_id,
            message: message || 'Requested Resource Not Found',
        });
    };

    res.unauthorized = (message = null) => {
        return res.status(401).json({
            status: false,
            request_id: req.request_id,
            message: message || 'Unauthorized',
        });
    };

    res.forbidden = (message = null) => {
        return res.status(403).json({
            status: false,
            request_id: req.request_id,
            message: message || 'Forbidden',
        });
    };

    res.internalServerError = (message = null) => {
        return res.status(500).json({
            status: false,
            request_id: req.request_id,
            message: message || 'Internal Server Error',
        });
    };

    res.sendPdf = (pdf) => {
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
    };

    next();
};

module.exports = ResponseMiddleware;
