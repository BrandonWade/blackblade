import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import AccountService from '../services/accounts';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const accountID = await AccountService.verifyAccount(email, password);
        req.session.authenticated = true;
        req.session.accountID = accountID;
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                errors: [{ msg: e.message }],
            });
        } else if (e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: [{ msg: e.message }],
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: [{ msg: 'error logging in' }],
            });
        }
    }

    return res.send();
};

const logout = async (req, res) => {
    req.session.destroy();
    res.clearCookie('sid');
    return res.send();
};

export { login, logout };
