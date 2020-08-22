import { check, param } from 'express-validator';

const searchQueryExists = check('q').isLength({ min: 1 });
const cardIDValidator = param('id').isInt().toInt({ min: 1 });

const basicSearchValidators = [searchQueryExists];
const cardValidators = [cardIDValidator];

export { basicSearchValidators, cardValidators };
