import { check, param, oneOf } from 'express-validator';
import { exclusiveColors, matchTypeExists } from './custom';

const nameExists = check('name').isLength({ min: 1 });
const textExists = check('text').isLength({ min: 1 });
const typeExists = check('type').isLength({ min: 1 });
const whiteExists = check('white')
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const blueExists = check('blue')
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const blackExists = check('black')
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const redExists = check('red')
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const greenExists = check('green')
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const colorlessExists = check('colorless')
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const setExists = check('set').isLength({ min: 3 });
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
        colorlessExists,
        setExists,
    ]),
    pageExists,
];
const cardValidators = [cardIDValidator];

export { searchValidators, cardValidators };
