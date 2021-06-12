import { hashValue, compareValues } from '../helpers/hash';
import generateToken from '../helpers/tokens';
import AccountRepository from '../repositories/accounts';
import EmailService from '../services/email';
import AlreadyExistsError from '../errors/already_exists';
import UnauthorizedError from '../errors/unauthorized';
import NotActivatedError from '../errors/not_activated';

const registerAccount = async (email, password) => {
    const passwordHash = await hashValue(password);
    const activationToken = generateToken();

    try {
        await AccountRepository.registerAccount(
            email,
            passwordHash,
            activationToken,
        );
    } catch (e) {
        if (!(e instanceof AlreadyExistsError)) {
            console.error('error registering account', e);
            throw e;
        }
    }

    await EmailService.sendAccountActivationEmail(email, activationToken);

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

const verifyAccount = async (email, password) => {
    try {
        const account = await AccountRepository.getAccountByEmail(email);
        const passwordsMatch = await compareValues(
            password,
            account.password_hash.toString(),
        );

        if (!passwordsMatch) {
            throw new UnauthorizedError('password does not match');
        }

        if (account?.id && !account.is_activated) {
            await registerAccount(email, password);
            throw new NotActivatedError('account is not activated');
        }

        return [account.id, account.public_id];
    } catch (e) {
        console.error('error verifying account', e);
        throw e;
    }
};

export default {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    resetPassword,
    verifyAccount,
};
