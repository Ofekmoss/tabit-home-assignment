import { StatusCodes } from 'http-status-codes';
import TabitError from './tabit.error.js';

class NotFoundError extends TabitError {

    /**
     * @param {object} details
     * @param {string} details.message
     */
    constructor({ message }) {
        super(message);
        this.code = StatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;
