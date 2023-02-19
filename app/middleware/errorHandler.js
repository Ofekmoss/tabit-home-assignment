import NotFoundError from '../entities/error/notFound.error.js';
import { sendErrorResponse } from '../utils/responseFormatter.utils.js';
import {
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    UNAUTHORIZED,
    CONFLICT,
    FORBIDDEN,
} from 'http-status-codes';
import UnauthorizedError from '../entities/error/400errors/unauthorized.error.js';
import ForbiddenError from '../entities/error/400errors/forbidden.error.js';

// 404 Errors are logged here since they are thrown before a controller.
const handleNotFoundError = (error, request, response, next) => {
    if (error instanceof NotFoundError) {
        return sendErrorResponse(error, NOT_FOUND, response);
    }
    next(error);
}; 

const handle400Errors = (error, request, response, next) => {
    if (error instanceof UnauthorizedError) {
        return sendErrorResponse(error, UNAUTHORIZED, response);
    } else if (error instanceof ForbiddenError) {
        return sendErrorResponse(error, FORBIDDEN, response);
    }
    next(error);
};

const handleDefaultError = (error, request, response, next) => {
    sendErrorResponse(error, INTERNAL_SERVER_ERROR, response);
};

// The order of the middlewares matter
const handleError = (app) => {
    app.use(handleNotFoundError);
    app.use(handle400Errors);
    app.use(handleDefaultError);
};

export default handleError;
