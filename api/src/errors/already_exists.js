class AlreadyExistsError extends Error {
    constructor(message = '') {
        super(message);
    }
}

export default AlreadyExistsError;
