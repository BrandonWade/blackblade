import { difference } from 'lodash';

export const addEqualCondition = (builder, params, field) => {
    params.forEach((param) => builder.where(field, param));
};

export const addLikeCondition = (builder, params, field) => {
    params.forEach((param) => builder.where(field, 'like', `%${param}%`));
};

export const addNegatableLikeCondition = (builder, params, key, field) => {
    params.forEach((param) => {
        if (param.isNegated) {
            builder.whereNot(field, 'like', `%${param[key]}%`);
        } else {
            builder.where(field, 'like', `%${param[key]}%`);
        }
    });
};

export const addInCondition = (builder, params, field) => {
    if (params.length === 0) {
        return;
    }

    builder.whereIn(field, params);
};

export const addColorConditions = (builder, colors, matchType) => {
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
};

export const addColorlessCondition = (builder, colorless, matchType) => {
    if (!colorless || !matchType) {
        return;
    }

    const colorList = ['is_white', 'is_blue', 'is_black', 'is_red', 'is_green'];

    if (matchType === 'exact' || matchType === 'at_most') {
        colorList.forEach((color) => builder.where(color, '=', false));
    }
};

export const addStatCondition = (builder, stat, field) => {
    if (!stat || !stat.comparator || stat.value === '') {
        return;
    }

    const comparator = stat.comparator === '==' ? '=' : stat.comparator;
    builder.where(field, comparator, stat.value);
};
