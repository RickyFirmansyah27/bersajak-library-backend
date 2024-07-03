const { validationResult } = require('express-validator');
const { GenerateRequestId } = require('../utils/helpers');

const ValidationHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const response = {
            status: false,
            message: 'Validation Error',
            errors: errors.array({ onlyFirstError: true }).map((error) => ({
                path: error.path,
                message: error.msg,
            })),
            request_id: GenerateRequestId(),
        };

        return res.status(400).json(response);
    }

    next();
};

module.exports = {
    ValidationHandler,
};
