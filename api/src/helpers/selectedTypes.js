export default function parseTypesFromString(typeString = '') {
    const tokens = typeString.split(/,/);

    return tokens.map((t) => {
        if (t.length > 1 && t[0] === '!') {
            return {
                type: t.substring(1),
                isNegated: true,
            };
        }

        return {
            type: t,
            isNegated: false,
        };
    });
}
