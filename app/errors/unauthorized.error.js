import TabitError from './tabit.error.js';
import { StatusCodes } from 'http-status-codes';

class UnauthorizedError extends TabitError {

    /**
     * @param {object} details
     * @param {string} details.message
     */
    constructor({ message }) {
        super( message );
        this.code = StatusCodes.UNAUTHORIZED;
    }
}

export default UnauthorizedError;
