class NewerVersionError extends Error {
    constructor(message = '') {
        super(message);
    }
}

export default NewerVersionError;
