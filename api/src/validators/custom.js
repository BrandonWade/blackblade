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
