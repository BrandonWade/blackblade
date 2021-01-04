import { query, param } from 'express-validator';
import {
    exclusiveColors,
    matchTypeExists,
    validStatComparator,
    statValueExists,
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
const cmcComparatorExists = query('cmcComparator')
    .optional()
    .custom((comparator) => validStatComparator('cmc', comparator))
    .custom((_, params) => statValueExists('cmc', params));
const cmcValueExists = query('cmcValue')
    .optional()
    .isFloat()
    .isLength({ min: 1 });
const powerComparatorExists = query('powerComparator')
    .optional()
    .custom((comparator) => validStatComparator('power', comparator))
    .custom((_, params) => statValueExists('power', params));
const powerValueExists = query('powerValue')
    .optional()
    .isInt()
    .isLength({ min: 1 });
const toughnessComparatorExists = query('toughnessComparator')
    .optional()
    .custom((comparator) => validStatComparator('toughness', comparator))
    .custom((_, params) => statValueExists('toughness', params));
const toughnessValueExists = query('toughnessValue')
    .optional()
    .isInt()
    .isLength({ min: 1 });
const loyaltyComparatorExists = query('loyaltyComparator')
    .optional()
    .custom((comparator) => validStatComparator('loyalty', comparator))
    .custom((_, params) => statValueExists('loyalty', params));
const loyaltyValueExists = query('loyaltyValue')
    .optional()
    .isInt()
    .isLength({ min: 1 });
const commonExists = query('common').optional().isBoolean();
const uncommonExists = query('uncommon').optional().isBoolean();
const rareExists = query('rare').optional().isBoolean();
const mythicExists = query('mythic').optional().isBoolean();
const flavorTextExists = query('flavorText').optional().isLength({ min: 1 });

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
    cmcComparatorExists,
    cmcValueExists,
    powerComparatorExists,
    powerValueExists,
    toughnessComparatorExists,
    toughnessValueExists,
    loyaltyComparatorExists,
    loyaltyValueExists,
    commonExists,
    uncommonExists,
    rareExists,
    mythicExists,
    flavorTextExists,
    mustExist,
    pageExists,
];
const cardValidators = [cardIDValidator];

export { searchValidators, cardValidators };
