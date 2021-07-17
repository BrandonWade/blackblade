import { StatusCodes } from 'http-status-codes';
import UnauthorizedError from '../errors/unauthorized';
import NotFoundError from '../errors/not_found';
import AccountService from '../services/accounts';
import cookieOptions, { DURATION_ONE_HOUR } from '../helpers/cookies';
import { errorMessage, successMessage, infoMessage } from '../helpers/messages';

const registerAccount = async (req, res) => {
    const { email, password } = req.body;

    try {
        await AccountService.registerAccount(email, password);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage(
                'An error occurred while registering your account.',
            ),
        });
    }

    return res.status(StatusCodes.OK).json({
        message: infoMessage(
            `We've sent a link to ${email}. To complete registration, please check your inbox.`,
        ),
    });
};

const activateAccount = async (req, res) => {
    const { activationToken } = req.params;

    try {
        await AccountService.activateAccount(activationToken);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: errorMessage(
                    'Your activation link is invalid. Please try again.',
                ),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occurred while activating your account.',
                ),
            });
        }
    }

    const message = successMessage(
        'Your account has been successfully activated. Please log in.',
    );
    res.cookie(
        'rm',
        JSON.stringify(message),
        cookieOptions({ maxAge: DURATION_ONE_HOUR }),
    );
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
                    'An error occurred while requesting a password reset.',
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
    const { passwordResetToken } = req.params;

    res.cookie(
        'prt',
        passwordResetToken,
        cookieOptions({ maxAge: DURATION_ONE_HOUR }),
    );

    return res.redirect('/password/reset');
};

const resetPassword = async (req, res) => {
    const { prt: token } = req.cookies;
    const { password } = req.body;

    try {
        await AccountService.resetPassword(token, password);
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                message: errorMessage(
                    'Your reset link has either expired or is invalid. Please try again.',
                ),
            });
        } else if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: errorMessage(
                    'Your reset link is invalid. Please try again.',
                ),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occurred while resetting your password.',
                ),
            });
        }
    }

    res.clearCookie('prt');
    const message = successMessage(
        'Your password has been successfully reset. Please log in.',
    );
    res.cookie(
        'rm',
        JSON.stringify(message),
        cookieOptions({ maxAge: DURATION_ONE_HOUR }),
    );
    return res.status(StatusCodes.OK).send();
};

export {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    passwordResetRedirect,
    resetPassword,
};
