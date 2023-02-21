import { StatusCodes } from 'http-status-codes';
import { isProdEnv } from './envData.util.js';

export const sendSuccessResponse = (data, response, code = StatusCodes.OK) => {
    const body = {
        success: true,
        ...data
    };
    response.status(code).json(body);
};

export const sendErrorResponse = (error, code, response) => {
    let body = {
        success: false
    };

    if (!isProdEnv) {
        body = {
            ...body,
            errorName: error.name,
            errorCode: code,
            errorMessage: error.message,
            errorStack: error.stack
        };
    }

    return response.status(code).json(body);
};
