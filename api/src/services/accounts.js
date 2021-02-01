import { generateIV, encryptValue, decryptValue } from '../helpers/encrypt';
import { Buffer } from 'buffer';
import hashValue from '../helpers/hash';
import AccountRepository from '../repositories/accounts';

const registerAccount = async (email, password) => {
    const emailIV = generateIV();
    const [emailEnc, emailAuthTag] = encryptValue(
        Buffer.from(process.env.EMAIL_ENC_KEY, 'hex'),
        emailIV,
        email,
    );
    const emailHash = await hashValue(email);
    const passwordHash = await hashValue(password);

    return AccountRepository.registerAccount(
        emailIV,
        emailAuthTag,
        emailEnc,
        emailHash,
        passwordHash,
    );
};

export default {
    registerAccount,
};
