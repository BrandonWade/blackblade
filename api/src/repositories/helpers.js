export const addLikeCondition = (builder, params, field) => {
    params.forEach((param) => builder.where(field, 'like', `%${param}%`));
};

export const addColourCondition = (builder, colours, field) => {
    if (colours.length === 0) {
        return;
    }

    colours.forEach((colour, i) => {
        const curr = `l${i}`;
        const prev = `l${i - 1}`;

        if (i === 0) {
            builder.innerJoin(
                { [curr]: 'card_face_colors' },
                `${curr}.card_face_id`,
                'f.id',
            );
        } else {
            builder.innerJoin(
                { [curr]: 'card_face_colors' },
                `${curr}.card_face_id`,
                `${prev}.card_face_id`,
            );
        }

        builder.where(`${curr}.color`, '=', colour);
    });

    return;
};
