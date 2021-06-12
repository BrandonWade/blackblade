class NotActivatedError extends Error {
    constructor(message = '') {
        super(message);
    }
}

export default NotActivatedError;
