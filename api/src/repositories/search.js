import { connection, builder } from '../db';
import { addLikeCondition, addColourCondition } from './helpers';

const getTotalResults = (nameTokens, textTokens, typeTokens, colours) => {
    const subquery = builder
        .select('c.*')
        .from('cards AS c')
        .innerJoin('card_faces AS f', 'c.id', 'f.card_id')
        .groupBy('c.oracle_id')
        .as('a');

    addLikeCondition(subquery, nameTokens, 'f.name');
    addLikeCondition(subquery, textTokens, 'f.oracle_text');
    addLikeCondition(subquery, typeTokens, 'f.type_line');
    addColourCondition(subquery, colours, 'l.color');

    return builder.count('* AS total_results').from(subquery);
};

const getCardsByName = (
    nameTokens,
    textTokens,
    typeTokens,
    colours,
    page,
    pageSize,
) => {
    const query = builder
        .select(
            'c.id AS card_id',
            'c.cmc',
            'c.rarity',
            'c.layout',
            's.sets_json',
        )
        .from('card_faces AS f')
        .innerJoin('cards AS c', 'c.id', 'f.card_id')
        .innerJoin('card_sets_list AS s', 's.id', 'c.card_sets_list_id')
        .groupBy('c.oracle_id')
        .orderBy('f.name')
        .limit(pageSize)
        .offset((page - 1) * pageSize);

    addLikeCondition(query, nameTokens, 'f.name');
    addLikeCondition(query, textTokens, 'f.oracle_text');
    addLikeCondition(query, typeTokens, 'f.type_line');
    addColourCondition(query, colours, 'l.color');

    return query;
};

const getCardByID = async (id) => {
    return await connection.query(
        `SELECT
        c.id card_id,
        c.cmc,
        c.rarity,
        c.layout,
        s.sets_json
        FROM cards c
        INNER JOIN card_sets_list s ON s.id = c.card_sets_list_id
        WHERE c.id = ?;
    `,
        [id],
    );
};

export default {
    getTotalResults,
    getCardsByName,
    getCardByID,
};
