import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import AccountService from '../services/accounts';
import cookieOptions from '../helpers/cookies';

const login = async (req, res) => {
    let accountID;
    let accountPublicID;

    try {
        const { email, password } = req.body;
        [accountID, accountPublicID] = await AccountService.verifyAccount(
            email,
            password,
        );
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

    res.cookie('apid', accountPublicID, cookieOptions());

    return res.json({
        account_public_id: accountPublicID,
    });
};

const logout = async (req, res) => {
    req.session.destroy();
    res.clearCookie('sid');
    res.clearCookie('apid');
    return res.send();
};

export { login, logout };
