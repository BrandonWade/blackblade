import { StatusCodes } from 'http-status-codes';
import AccountService from '../services/accounts';

// TODO: Add middleware to validate payload
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

const activateAccount = (req, res) => {
    const token = req.query['t'];

    const success = AccountService.activateAccount(token);
    if (!success) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error activating account' }],
        });
    }

    // TODO: Redirect to login page
    return res.redirect('/');
};

export { registerAccount, activateAccount };
