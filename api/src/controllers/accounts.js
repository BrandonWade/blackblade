import { StatusCodes } from 'http-status-codes';
import AccountService from '../services/accounts';

const registerAccount = async (req, res) => {
    const result = await AccountService.registerAccount(
        req.body.email,
        req.body.password,
    );

    if (!result.activation_token) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error registering account' }],
        });
    }

    return res.status(StatusCodes.OK).json(result);
};

export { registerAccount };
