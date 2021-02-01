import { Buffer } from 'buffer';
import crypto from 'crypto';

const IV_BYTES = 16;
const AES_ALGO = 'aes-256-gcm';

export const generateIV = () =>
    Buffer.from(crypto.randomBytes(IV_BYTES), 'utf8');

export const encryptValue = (key, iv, value) => {
    const cipher = crypto.createCipheriv(AES_ALGO, key, iv);
    let enc = cipher.update(value, 'utf8', 'base64');
    enc += cipher.final('base64');

    return [enc, cipher.getAuthTag()];
};

export const decryptValue = (tag, key, iv, value) => {
    const decipher = crypto.createDecipheriv(AES_ALGO, key, iv);
    decipher.setAuthTag(tag);
    let str = decipher.update(value, 'base64', 'utf8');
    str += decipher.final('utf8');

    return str;
};
