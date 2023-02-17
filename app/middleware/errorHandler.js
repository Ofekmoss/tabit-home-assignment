import NotFoundError from '../entities/error/notFound.error.js';
import { sendErrorResponse } from '../utils/responseFormatter.utils.js';
import {
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} from 'http-status-codes';


// 404 Errors are logged here since they are thrown before a controller.
const handleNotFoundError = (error, request, response, next) => {
    if (error instanceof NotFoundError) {
        return sendErrorResponse(error, NOT_FOUND, response);
    }
    next(error);
};

const handleDefaultError = (error, request, response, next) => {
    sendErrorResponse(error, INTERNAL_SERVER_ERROR, response);
};

// The order of the middlewares matter
const handleError = (app) => {
    app.use(handleNotFoundError);
    app.use(handleDefaultError);
};

export default handleError;
