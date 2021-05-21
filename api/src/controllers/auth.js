import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import AccountService from '../services/accounts';
import cookieOptions from '../helpers/cookies';
import { errorMessage } from '../helpers/messages';

const csrf = (_, res) => {
    return res.send();
};

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
        if (e instanceof UnauthorizedError || e instanceof NotFoundError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: errorMessage('Invalid email or password.'),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage('An error occurred while logging in.'),
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

export { csrf, login, logout };
