import TabitError from '../tabit.error.js';

class ForbiddenError extends TabitError {

    /**
     * @param {object} details
     * @param {string} details.message
     */
    constructor({ message }) {
        super(message);
    }
}

export default ForbiddenError;
