export default function useSelectedTypes() {
    const convertTypesToString = types => {
        return types
            .map(t => {
                if (t.isNegated) {
                    return `!${t.type}`;
                }

                return t.type;
            })
            .join(',');
    };

    const parseTypesFromString = typeString => {
        if (typeString.length === 0) {
            return [];
        }

        const tokens = typeString.split(',');

        return tokens.map(t => {
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
    };

    return {
        convertTypesToString,
        parseTypesFromString,
    };
}
