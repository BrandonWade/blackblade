import { check, param, oneOf } from 'express-validator';

const nameExists = check('name').isLength({ min: 1 });
const textExists = check('text').isLength({ min: 1 });
const typeExists = check('type').isLength({ min: 1 });
const whiteExists = check('white').isBoolean();
const blueExists = check('blue').isBoolean();
const blackExists = check('black').isBoolean();
const redExists = check('red').isBoolean();
const greenExists = check('green').isBoolean();
const pageExists = check('page').isInt({ min: 1 });
const cardIDValidator = param('id').isInt().toInt({ min: 1 });

const searchValidators = [
    oneOf([
        nameExists,
        textExists,
        typeExists,
        whiteExists,
        blueExists,
        blackExists,
        redExists,
        greenExists,
    ]),
    pageExists,
];
const cardValidators = [cardIDValidator];

export { searchValidators, cardValidators };
