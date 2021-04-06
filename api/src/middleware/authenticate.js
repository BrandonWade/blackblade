import { StatusCodes } from 'http-status-codes';
import { errorMessage } from '../helpers/messages';

const authenticate = (message = '') => {
    return function (req, res, next) {
        if (!req.session.authenticated) {
            if (message) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: errorMessage(message),
                });
            }

            return res.status(StatusCodes.UNAUTHORIZED).send();
        }

        next();
    };
};

export default authenticate;
