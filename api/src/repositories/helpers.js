export const addLikeCondition = (builder, params, field) => {
    params.forEach((param) => builder.where(field, 'like', `%${param}%`));
};

export const addColourCondition = (builder, colours, field) => {
    if (colours.length > 0) {
        builder.innerJoin('card_face_colors AS l', 'f.id', 'l.card_face_id');
        builder.whereIn(field, colours);
    }
};
