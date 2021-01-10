export function exclusiveColors(_, { req }) {
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
}

export function matchTypeExists(_, { req }) {
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
}

export function validSetList(setString) {
    const sets = setString.split(',');

    if (setString.length === 0) {
        throw new Error(`no valid set codes provided`);
    }

    if (!sets.every((s) => s.length >= 3)) {
        throw new Error(`invalid set codes`);
    }

    return true;
}

export function validStatComparator(stat, comparator) {
    const validComparator = ['==', '!=', '<', '<=', '>', '>='];

    if (comparator === '') {
        throw new Error(`comparator for ${stat} does not exist`);
    }

    if (!validComparator.includes(comparator)) {
        const comparators = validComparator.join(', ');
        throw new Error(`comparator must be one of: ${comparators}`);
    }

    return true;
}

export function statValueExists(stat, { req }) {
    const statValue = req.query[`${stat}Value`];

    if (statValue === undefined) {
        throw new Error(`value for ${stat} does not exist`);
    }

    return true;
}

export function oneOptionalFieldExists(query) {
    const optionalFields = [
        'name',
        'text',
        'types',
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
