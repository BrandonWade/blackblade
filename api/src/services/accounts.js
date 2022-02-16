import { hashValue, compareValues } from '../helpers/hash';
import generateToken from '../helpers/tokens';
import AccountRepository from '../repositories/accounts';
import EmailService from '../services/email';
import AlreadyExistsError from '../errors/already_exists';
import UnauthorizedError from '../errors/unauthorized';
import NotActivatedError from '../errors/not_activated';
import NotFoundError from '../errors/not_found';

const registerAccount = async (email, password) => {
    const account = await AccountRepository.getAccountByEmail(email);
    const passwordHash = await hashValue(password);
    const activationToken = generateToken();

    if (!account || !account?.is_activated) {
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
    }
};

const activateAccount = async (token) => {
    try {
        await AccountRepository.activateAccount(token);
    } catch (e) {
        console.error('error activating account', e);
        throw e;
    }
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
};

const resetPassword = async (token, password) => {
    const passwordHash = await hashValue(password);

    try {
        await AccountRepository.resetPassword(token, passwordHash);
    } catch (e) {
        console.error('error resetting password', e);
        throw e;
    }
};

const verifyAccount = async (email, password) => {
    try {
        const account = await AccountRepository.getAccountByEmail(email);
        if (!account) {
            throw new NotFoundError(`account with email '${email}' not found`);
        }

        const passwordsMatch = await compareValues(
            password,
            account.password_hash.toString(),
        );
        if (!passwordsMatch) {
            throw new UnauthorizedError('passwords do not match');
        }

        if (account?.id && !account.is_activated) {
            throw new NotActivatedError('account is not activated');
        }

        return [account.id, account.public_id];
    } catch (e) {
        console.error('error verifying account', e);
        throw e;
    }
};

const changePassword = async (accountID, currentPassword, newPassword) => {
    try {
        const account = await AccountRepository.getAccountByID(accountID);
        if (!account) {
            throw new NotFoundError(`account with id ${accountID} not found`);
        }

        const passwordsMatch = await compareValues(
            currentPassword,
            account.password_hash.toString(),
        );
        if (!passwordsMatch) {
            throw new UnauthorizedError('passwords do not match');
        }

        const newPasswordHash = await hashValue(newPassword);

        await AccountRepository.changePassword(accountID, newPasswordHash);

        await EmailService.sendPasswordChangedEmail(account.email);
    } catch (e) {
        console.error('error changing password', e);
        throw e;
    }
};

export default {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    resetPassword,
    verifyAccount,
    changePassword,
};
