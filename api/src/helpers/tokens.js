import crypto from 'crypto';

export const generateToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
};
