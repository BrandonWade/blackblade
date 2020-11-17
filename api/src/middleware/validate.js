import { validationResult } from 'express-validator';
import * as HttpStatus from 'http-status-codes';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            errors: errors.array(),
        });

        return;
    }

    next();
};

export default validate;
