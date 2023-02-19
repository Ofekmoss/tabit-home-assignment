import TabitError from '../tabit.error.js';

class UnauthorizedError extends TabitError {

    /**
     * @param {object} details
     * @param {string} details.message
     */
    constructor({ message }) {
        super( message );
    }
}

export default UnauthorizedError;
