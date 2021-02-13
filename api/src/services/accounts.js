import { generateIV, encryptValue } from '../helpers/encrypt';
import { Buffer } from 'buffer';
import hashValue from '../helpers/hash';
import generateToken from '../helpers/tokens';
import AccountRepository from '../repositories/accounts';
import EmailService from '../services/email';

const registerAccount = async (email, password) => {
    const emailIV = generateIV();
    const [emailEnc, emailAuthTag] = encryptValue(
        Buffer.from(process.env.EMAIL_ENC_KEY, 'hex'),
        emailIV,
        email,
    );
    const emailHash = await hashValue(email);
    const passwordHash = await hashValue(password);
    const activationToken = generateToken();

    try {
        AccountRepository.registerAccount(
            emailIV,
            emailAuthTag,
            emailEnc,
            emailHash,
            passwordHash,
            activationToken,
        );
    } catch (e) {
        console.error('error registering account', e);
        return false;
    }

    const emailSent = EmailService.sendAccountActivationEmail(email, token);
    if (!emailSent) {
        console.error('error sending activation email');
        return false;
    }

    return true;
};

export default {
    registerAccount,
};
