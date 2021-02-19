import { StatusCodes } from 'http-status-codes';
import AccountService from '../services/accounts';

const registerAccount = async (req, res) => {
    const success = await AccountService.registerAccount(
        req.body.email,
        req.body.password,
    );

    if (!success) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error registering account' }],
        });
    }

    return res.status(StatusCodes.OK).send();
};

const activateAccount = async (req, res) => {
    const token = req.query['t'];

    const success = await AccountService.activateAccount(token);
    if (!success) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error activating account' }],
        });
    }

    // TODO: Redirect to login page
    return res.redirect('/');
};

const requestPasswordReset = async (req, res) => {
    const email = req.body['email'];

    const success = await AccountService.requestPasswordReset(email);
    if (!success) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error requesting password reset' }],
        });
    }

    return res.status(StatusCodes.OK).send();
};

export { registerAccount, activateAccount, requestPasswordReset };
