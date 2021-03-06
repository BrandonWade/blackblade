import { StatusCodes } from 'http-status-codes';
import AlreadyExistsError from '../errors/already_exists';
import NotFoundError from '../errors/not_found';
import AccountService from '../services/accounts';

const registerAccount = async (req, res) => {
    try {
        await AccountService.registerAccount(req.body.email, req.body.password);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                errors: [{ msg: e.message }],
            });
        } else if (e instanceof AlreadyExistsError) {
            return res.status(StatusCodes.CONFLICT).json({
                errors: [{ msg: e.message }],
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: [{ msg: 'error registering account' }],
            });
        }
    }

    return res.status(StatusCodes.OK).send();
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
    const email = req.body['email'];

    try {
        await AccountService.requestPasswordReset(email);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                errors: [{ msg: e.message }],
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: [{ msg: 'error requesting password reset' }],
            });
        }
    }

    return res.status(StatusCodes.OK).send();
};

const passwordResetRedirect = async (req, res) => {
    const token = req.params['passwordResetToken'];
    const cookieAge = 3600000; // 1 hour
    const cookieSecure = process.env.ENVIRONMENT !== 'develop';

    res.cookie('prt', token, {
        maxAge: cookieAge,
        httpOnly: false,
        secure: cookieSecure,
    });

    return res.redirect('/password/reset');
};

const resetPassword = async (req, res) => {
    const token = req.cookies['prt'];
    const password = req.body['password'];

    try {
        await AccountService.resetPassword(token, password);
    } catch (e) {
        if (e instanceof NotFoundError) {
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
