import { difference } from 'lodash';

export const addEqualCondition = (builder, params, field) => {
    params.forEach((param) => builder.where(field, param));
};

export const addLikeCondition = (builder, params, field) => {
    params.forEach((param) => builder.where(field, 'like', `%${param}%`));
};

export const addColorCondition = (builder, colors) => {
    if (colors.length === 0) {
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

    colors.forEach((color) => builder.where(colorMap[color], '=', true));
    diffColors.forEach((color) => builder.where(colorMap[color], '=', false));
};
