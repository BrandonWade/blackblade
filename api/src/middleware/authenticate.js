import { StatusCodes } from 'http-status-codes';

const authenticate = (req, res, next) => {
    if (!req.session.authenticated) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    next();
};

export default authenticate;
