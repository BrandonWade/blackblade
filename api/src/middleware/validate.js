import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const validate = (redirect = '') => {
    return function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (redirect) {
                return res.redirect(redirect);
            }

            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                errors: errors.array(),
            });
        }

        next();
    };
};

export default validate;
