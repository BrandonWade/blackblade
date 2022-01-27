import { difference } from 'lodash';

export function parseTypesFromString(typeString = '') {
    if (typeString.length === 0) {
        return [];
    }

    const tokens = typeString.split(',');

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

export function parseValuesFromObject(obj = {}) {
    return Object.keys(obj).filter((k) => obj[k]);
}

export function addLikeCondition(builder, params, field) {
    params.forEach((param) => builder.where(field, 'like', `%${param}%`));
}

export function addNegatableLikeCondition(builder, params, key, field) {
    params.forEach((param) => {
        if (param.isNegated) {
            builder.whereNot(field, 'like', `%${param[key]}%`);
        } else {
            builder.where(field, 'like', `%${param[key]}%`);
        }
    });
}

export function addInCondition(builder, params, field) {
    if (params.length === 0) {
        return;
    }

    builder.whereIn(field, params);
}

export function addColorConditions(builder, colors, matchType) {
    if (colors.length === 0 || !matchType) {
        return;
    }

    const colorMap = {
        W: 'is_white',
        U: 'is_blue',
        B: 'is_black',
        R: 'is_red',
        G: 'is_green',
    };
    const diffColors = difference(Object.keys(colorMap), colors);

    if (matchType === 'exact') {
        colors.forEach((color) => builder.where(colorMap[color], '=', true));
        diffColors.forEach((color) =>
            builder.where(colorMap[color], '=', false),
        );
    } else if (matchType === 'at_least') {
        colors.forEach((color) => builder.where(colorMap[color], '=', true));
    } else if (matchType === 'at_most') {
        builder.where((builder) => {
            colors.forEach((color) =>
                builder.orWhere(colorMap[color], '=', true),
            );

            // Include colorless cards in the results
            builder.orWhere((builder) => {
                Object.values(colorMap).forEach((color) =>
                    builder.andWhere(color, '=', false),
                );
            });
        });
        diffColors.forEach((color) =>
            builder.where(colorMap[color], '=', false),
        );
    }
}

export function addColorlessCondition(builder, colorless, matchType) {
    if (!colorless || !matchType) {
        return;
    }

    const colorList = ['is_white', 'is_blue', 'is_black', 'is_red', 'is_green'];

    if (matchType === 'exact' || matchType === 'at_most') {
        colorList.forEach((color) => builder.where(color, '=', false));
    }
}

export function addStatCondition(builder, stat, field) {
    if (!stat || !stat.comparator || stat.value === '') {
        return;
    }

    const comparator = stat.comparator === '==' ? '=' : stat.comparator;
    builder.where(field, comparator, stat.value);
}
