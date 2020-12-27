import { check, param, oneOf } from 'express-validator';
import { exclusiveColors } from './custom';

const nameExists = check('name').isLength({ min: 1 });
const textExists = check('text').isLength({ min: 1 });
const typeExists = check('type').isLength({ min: 1 });
const whiteExists = check('white').isBoolean().custom(exclusiveColors);
const blueExists = check('blue').isBoolean().custom(exclusiveColors);
const blackExists = check('black').isBoolean().custom(exclusiveColors);
const redExists = check('red').isBoolean().custom(exclusiveColors);
const greenExists = check('green').isBoolean().custom(exclusiveColors);
const colorlessExists = check('colorless').isBoolean().custom(exclusiveColors);
const pageExists = check('page').isInt({ min: 1 });
const setExists = check('set').isLength({ min: 3 });
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
        colorlessExists,
        setExists,
    ]),
    pageExists,
];
const cardValidators = [cardIDValidator];

export { searchValidators, cardValidators };
