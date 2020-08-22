import { check, param } from 'express-validator';

const searchQueryExists = check('q').isLength({ min: 1 });
const pageExists = check('page').isInt({ min: 1 });
const cardIDValidator = param('id').isInt().toInt({ min: 1 });

const basicSearchValidators = [searchQueryExists, pageExists];
const cardValidators = [cardIDValidator];

export { basicSearchValidators, cardValidators };
