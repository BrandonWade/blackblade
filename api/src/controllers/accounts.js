import { StatusCodes } from 'http-status-codes';
import AlreadyExistsError from '../errors/already_exists';
import UnauthorizedError from '../errors/unauthorized';
import NotFoundError from '../errors/not_found';
import AccountService from '../services/accounts';
import cookieOptions, { DURATION_ONE_HOUR } from '../helpers/cookies';
import { errorMessage, infoMessage } from '../helpers/messages';

const registerAccount = async (req, res) => {
    const { email, password } = req.body;

    try {
        await AccountService.registerAccount(email, password);
    } catch (e) {
        if (!(e instanceof AlreadyExistsError)) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occured while registering your account.',
                ),
            });
        }
    }

    return res.status(StatusCodes.OK).json({
        message: infoMessage(
            `We've sent a link to ${email}. To complete registration, please check your inbox.`,
        ),
    });
};

const activateAccount = async (req, res) => {
    const token = req.params['activationToken'];

    try {
        await AccountService.activateAccount(token);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                errors: [{ msg: e.message }],
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: [{ msg: 'error activating account' }],
            });
        }
    }

    return res.redirect('/login');
};

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        await AccountService.requestPasswordReset(email);
    } catch (e) {
        if (!(e instanceof NotFoundError)) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occured while requesting a password reset.',
                ),
            });
        }
    }

    return res.status(StatusCodes.OK).json({
        message: infoMessage(
            `We've sent a link to ${email}. To reset your password, please check your inbox.`,
        ),
    });
};

const passwordResetRedirect = async (req, res) => {
    const token = req.params['passwordResetToken'];

    res.cookie('prt', token, cookieOptions(DURATION_ONE_HOUR));

    return res.redirect('/password/reset');
};

const resetPassword = async (req, res) => {
    const token = req.cookies['prt'];
    const password = req.body['password'];

    try {
        await AccountService.resetPassword(token, password);
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                errors: [{ msg: e.message }],
            });
        } else if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                errors: [{ msg: e.message }],
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: [{ msg: 'error resetting password' }],
            });
        }
    }

    res.clearCookie('prt');
    return res.status(StatusCodes.OK).send();
};

export {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    passwordResetRedirect,
    resetPassword,
};
