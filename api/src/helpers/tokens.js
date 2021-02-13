import crypto from 'crypto';

const generateToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
};

export default generateToken;
