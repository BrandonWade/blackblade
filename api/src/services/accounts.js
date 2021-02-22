import hashValue from '../helpers/hash';
import generateToken from '../helpers/tokens';
import AccountRepository from '../repositories/accounts';
import EmailService from '../services/email';

const registerAccount = async (email, password) => {
    const passwordHash = await hashValue(password);
    const activationToken = generateToken();

    try {
        await AccountRepository.registerAccount(
            email,
            passwordHash,
            activationToken,
        );

        await EmailService.sendAccountActivationEmail(email, activationToken);
    } catch (e) {
        console.error('error registering account', e);
        throw e;
    }

    return true;
};

const activateAccount = async (token) => {
    try {
        await AccountRepository.activateAccount(token);
    } catch (e) {
        console.error('error activating account', e);
        throw e;
    }

    return true;
};

const requestPasswordReset = async (email) => {
    const passwordResetToken = generateToken();

    try {
        await AccountRepository.createPasswordResetToken(
            email,
            passwordResetToken,
        );

        await EmailService.sendPasswordResetEmail(email, passwordResetToken);
    } catch (e) {
        console.error('error requesting password reset', e);
        throw e;
    }

    return true;
};

const resetPassword = async (token, password) => {
    const passwordHash = await hashValue(password);

    try {
        await AccountRepository.resetPassword(token, passwordHash);
    } catch (e) {
        console.error('error resetting password', e);
        throw e;
    }

    return true;
};

export default {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    resetPassword,
};
