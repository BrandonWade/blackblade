import { query } from 'express-validator';

const exclusiveColors = (_, { req }) => {
    const colorless = req.query['colorless'] === 'true';
    const colors = [
        req.query['white'] === 'true',
        req.query['blue'] === 'true',
        req.query['black'] === 'true',
        req.query['red'] === 'true',
        req.query['green'] === 'true',
    ];

    if (colorless === true && colors.some((c) => c === true)) {
        throw new Error('colors and colorless are mutually exclusive');
    }

    return true;
};

const matchTypeExists = (_, { req }) => {
    const matchType = req.query['matchType'];
    const matchTypes = ['exact', 'at_least', 'at_most'];
    const colors = [
        req.query['white'] === 'true',
        req.query['blue'] === 'true',
        req.query['black'] === 'true',
        req.query['red'] === 'true',
        req.query['green'] === 'true',
        req.query['colorless'] === 'true',
    ];

    if (!matchTypes.includes(matchType)) {
        const types = matchTypes.join(', ');
        throw new Error(`match type must be one of: ${types}`);
    }

    if (colors.every((c) => c === false)) {
        throw new Error(
            'match type must be included when at least one color option selected',
        );
    }

    return true;
};

const validList = (type, listString) => {
    const items = listString.split(',');

    if (listString.length === 0 || items.length === 0) {
        throw new Error(`no valid ${type} provided`);
    }

    return true;
};

const validStatComparator = (stat, comparator) => {
    const validComparator = ['==', '!=', '<', '<=', '>', '>='];

    if (comparator === '') {
        throw new Error(`comparator for ${stat} does not exist`);
    }

    if (!validComparator.includes(comparator)) {
        const comparators = validComparator.join(', ');
        throw new Error(`comparator must be one of: ${comparators}`);
    }

    return true;
};

const statValueExists = (stat, { req }) => {
    const statValue = req.query[`${stat}Value`];

    if (statValue === undefined) {
        throw new Error(`value for ${stat} does not exist`);
    }

    return true;
};

export function oneOptionalFieldExists(query) {
    const optionalFields = [
        'name',
        'text',
        'selectedTypes',
        'white',
        'blue',
        'black',
        'red',
        'green',
        'colorless',
        'selectedSets',
        'cmcComparator',
        'cmcValue',
        'powerComparator',
        'powerValue',
        'toughnessComparator',
        'toughnessValue',
        'loyaltyComparator',
        'loyaltyValue',
        'common',
        'uncommon',
        'rare',
        'mythic',
        'flavorText',
    ];

    if (optionalFields.every((field) => query[field] === undefined)) {
        throw new Error('at least one search criterion must be provided');
    }

    return true;
}

const nameExists = query('name').optional().isLength({ min: 1 });
const textExists = query('text').optional().isLength({ min: 1 });
const typeExists = query('selectedTypes')
    .optional()
    .custom((selectedTypes) => validList('types', selectedTypes));
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
const setExists = query('selectedSets')
    .optional()
    .custom((selectedSets) => validList('set codes', selectedSets));
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

export { searchValidators };
