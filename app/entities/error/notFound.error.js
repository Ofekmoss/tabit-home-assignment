import TabitError from './tabit.error.js';

class NotFoundError extends TabitError {

    /**
     * @param {object} details
     * @param {string} details.message
     */
    constructor({ message }) {
        super({ message });
    }
}

export default NotFoundError;
