import { StatusCodes } from 'http-status-codes';
import AccountService from '../services/accounts';

const registerAccount = async (req, res) => {
    try {
        const result = await AccountService.registerAccount(
            req.body.email,
            req.body.password,
        );
        res.status(StatusCodes.OK).json(result);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error registering account' }],
        });
    }
};

export { registerAccount };
