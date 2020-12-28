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
    const matchType = req.query['match_type'];
    const matchTypes = ['exact', 'at_least', 'at_most'];
    const colors = [
        req.query['white'] === 'true',
        req.query['blue'] === 'true',
        req.query['black'] === 'true',
        req.query['red'] === 'true',
        req.query['green'] === 'true',
    ];

    if (!matchTypes.includes(matchType)) {
        throw new Error(`match type must be one of: ${matchTypes.join(', ')}`);
    }

    if (colors.every((c) => c === false)) {
        throw new Error(
            'match type must be included when at least one color option selected',
        );
    }

    return true;
}
