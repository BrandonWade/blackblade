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

export function validList(type, listString) {
    const items = listString.split(',');

    if (listString.length === 0 || items.length === 0) {
        throw new Error(`no valid ${type} provided`);
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

export function passwordsMatch(password, { req }) {
    const confirmPassword = req.body['confirm_password'];

    if (password !== confirmPassword) {
        throw new Error('password and confirm password do not match');
    }

    return true;
}

export function visibilityValidValue(visibility) {
    const visibilityValues = ['public', 'private'];

    if (!visibilityValues.includes(visibility)) {
        throw new Error(
            `visibility must be one of: ${visibilityValues.join(', ')}`,
        );
    }

    return true;
}

export function cardValuesValid(cards) {
    let errors = [];

    cards.forEach((c) => {
        if (!Number.isInteger(parseInt(c.count))) {
            errors = errors.concat(`count value ${c.count} is invalid`);
        }
    });

    if (errors.length > 0) {
        throw new Error(
            `deck contains the following errors: ${errors.join(', ')}`,
        );
    }

    return true;
}
