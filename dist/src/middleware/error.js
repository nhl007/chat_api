"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const handleErrors = (err, req, res, next) => {
    const nodeEnv = process.env.NODE_ENV || 'DEV';
    err.status = err.status || 500;
    err.message = err.message || 'Enteral server error';
    if (nodeEnv === 'DEV') {
        res.status(err.status).json({
            success: false,
            errors: err,
            message: err.message,
            error_stack: err.stack,
        });
    }
    if (nodeEnv === 'PROD') {
        res.status(err.status).json({
            success: false,
            message: err.message,
        });
    }
};
exports.handleErrors = handleErrors;
