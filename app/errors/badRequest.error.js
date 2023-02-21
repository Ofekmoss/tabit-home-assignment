import TabitError from './tabit.error.js';
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends TabitError {

    /**
     * @param {object} details
     * @param {string} details.message
     */
    constructor({ message }) {
        super( message );
        this.code = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequestError;
