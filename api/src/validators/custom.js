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
        'set',
        'common',
        'uncommon',
        'rare',
        'mythic',
        'flavorText',
    ];

    if (optionalFields.every((field) => query[field] === undefined)) {
        const fields = optionalFields.join(', ');
        throw new Error(
            `at least one of the following fields must be present: ${fields}`,
        );
    }

    return true;
}
