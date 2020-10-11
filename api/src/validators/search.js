import { check, param, oneOf } from 'express-validator';

const nameExists = check('name').isLength({ min: 1 });
const textExists = check('text').isLength({ min: 1 });
const typeExists = check('type').isLength({ min: 1 });
const pageExists = check('page').isInt({ min: 1 });
const cardIDValidator = param('id').isInt().toInt({ min: 1 });

const basicSearchValidators = [
    oneOf([nameExists, textExists, typeExists]),
    pageExists,
];
const cardValidators = [cardIDValidator];

export { basicSearchValidators, cardValidators };
