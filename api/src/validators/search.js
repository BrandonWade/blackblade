import { query, param } from 'express-validator';
import {
    exclusiveColors,
    matchTypeExists,
    oneOptionalFieldExists,
} from './custom';

const nameExists = query('name').optional().isLength({ min: 1 });
const textExists = query('text').optional().isLength({ min: 1 });
const typeExists = query('type').optional().isLength({ min: 1 });
const whiteExists = query('white')
    .optional()
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const blueExists = query('blue')
    .optional()
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const blackExists = query('black')
    .optional()
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const redExists = query('red')
    .optional()
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const greenExists = query('green')
    .optional()
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const colorlessExists = query('colorless')
    .optional()
    .isBoolean()
    .custom(exclusiveColors)
    .custom(matchTypeExists);
const setExists = query('set').optional().isLength({ min: 3 });

// At minimum one of the optional fields must exist
const mustExist = query().custom(oneOptionalFieldExists);

const pageExists = query('page').isInt({ min: 1 });

const cardIDValidator = param('id').isInt().toInt({ min: 1 });

const searchValidators = [
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
    mustExist,
    pageExists,
];
const cardValidators = [cardIDValidator];

export { searchValidators, cardValidators };
