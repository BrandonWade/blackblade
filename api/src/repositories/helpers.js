import { difference } from 'lodash';

export const addEqualCondition = (builder, params, field) => {
    params.forEach((param) => builder.where(field, param));
};

export const addLikeCondition = (builder, params, field) => {
    params.forEach((param) => builder.where(field, 'like', `%${param}%`));
};

export const addColourCondition = (builder, colours) => {
    if (colours.length === 0) {
        return;
    }

    const colourMap = {
        W: 'is_white',
        U: 'is_blue',
        B: 'is_black',
        R: 'is_red',
        G: 'is_green',
    };
    const diffColours = difference(Object.keys(colourMap), colours);

    colours.forEach((colour) => builder.where(colourMap[colour], '=', true));
    diffColours.forEach((colour) =>
        builder.where(colourMap[colour], '=', false),
    );
};
