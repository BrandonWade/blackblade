import { connection, builder } from '../db';
import {
    addLikeCondition,
    addColorCondition,
    addColorlessCondition,
    addEqualCondition,
} from './helpers';

const getTotalResults = (
    nameTokens,
    textTokens,
    typeTokens,
    colors,
    colorless,
    set,
) => {
    const subquery = builder
        .select('c.*')
        .from('cards AS c')
        .innerJoin('card_faces AS f', 'c.id', 'f.card_id')
        .groupBy('c.oracle_id')
        .as('a');

    addLikeCondition(subquery, nameTokens, 'f.name');
    addLikeCondition(subquery, textTokens, 'f.oracle_text');
    addLikeCondition(subquery, typeTokens, 'f.type_line');
    addColorCondition(subquery, colors);
    addColorlessCondition(subquery, colorless);
    addEqualCondition(subquery, set, 'c.set_code');

    return builder.count('* AS total_results').from(subquery);
};

const getCardsByName = (
    nameTokens,
    textTokens,
    typeTokens,
    colors,
    colorless,
    set,
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
            'r.rulings_json',
        )
        .from('card_faces AS f')
        .innerJoin('cards AS c', 'c.id', 'f.card_id')
        .innerJoin('card_sets_list AS s', 's.id', 'c.card_sets_list_id')
        .leftJoin('card_rulings_list AS r', 'r.id', 'c.card_rulings_list_id')
        .groupBy('c.oracle_id')
        .orderBy('f.name')
        .limit(pageSize)
        .offset((page - 1) * pageSize);

    addLikeCondition(query, nameTokens, 'f.name');
    addLikeCondition(query, textTokens, 'f.oracle_text');
    addLikeCondition(query, typeTokens, 'f.type_line');
    addColorCondition(query, colors);
    addColorlessCondition(query, colorless);
    addEqualCondition(query, set, 'c.set_code');

    return query;
};

const getCardByID = async (id) => {
    return await connection.query(
        `SELECT
        c.id card_id,
        c.cmc,
        c.rarity,
        c.layout,
        s.sets_json,
        r.rulings_json
        FROM cards c
        INNER JOIN card_sets_list s ON s.id = c.card_sets_list_id
        LEFT JOIN card_rulings_list r ON r.id = c.card_rulings_list_id
        WHERE c.id = ?;
    `,
        [id],
    );
};

const getRandomCard = async () => {
    return await connection.query(
        `SELECT
        a.card_id,
        a.cmc,
        a.rarity,
        a.layout,
        s.sets_json,
        r.rulings_json
        FROM (
            SELECT
            c.id card_id,
            c.cmc,
            c.rarity,
            c.layout,
            c.card_sets_list_id,
            c.card_rulings_list_id
            FROM cards c
            ORDER BY RAND()
            LIMIT 1
        ) a
        INNER JOIN card_sets_list s ON s.id = a.card_sets_list_id
        LEFT JOIN card_rulings_list r ON r.id = a.card_rulings_list_id;
    `,
        [],
    );
};

export default {
    getTotalResults,
    getCardsByName,
    getCardByID,
    getRandomCard,
};
