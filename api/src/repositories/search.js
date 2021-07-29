import { connection, builder } from '../db';
import {
    addLikeCondition,
    addColorConditions,
    addColorlessCondition,
    addStatCondition,
    addInCondition,
} from './helpers';

const getTotalResults = (
    nameTokens,
    textTokens,
    typeTokens,
    colors,
    colorless,
    matchType,
    setTokens,
    cmc,
    power,
    toughness,
    loyalty,
    rarities,
    flavorTextTokens,
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
    addColorConditions(subquery, colors, matchType);
    addColorlessCondition(subquery, colorless, matchType);
    addStatCondition(subquery, cmc, 'c.cmc');
    addStatCondition(subquery, power, 'f.power');
    addStatCondition(subquery, toughness, 'f.toughness');
    addStatCondition(subquery, loyalty, 'f.loyalty');
    addInCondition(subquery, setTokens, 'c.set_code');
    addInCondition(subquery, rarities, 'c.rarity');
    addLikeCondition(subquery, flavorTextTokens, 'f.flavor_text');

    return builder.count('* AS total_results').from(subquery);
};

const getCardsByProperties = (
    nameTokens,
    textTokens,
    typeTokens,
    colors,
    colorless,
    matchType,
    setTokens,
    cmc,
    power,
    toughness,
    loyalty,
    rarities,
    flavorTextTokens,
    page,
    pageSize,
) => {
    const query = builder
        .select(
            'c.id AS card_id',
            'c.cmc',
            'c.layout',
            'c.name',
            'c.set_name',
            'c.set_code',
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
    addColorConditions(query, colors, matchType);
    addColorlessCondition(query, colorless, matchType);
    addStatCondition(query, cmc, 'c.cmc');
    addStatCondition(query, power, 'f.power');
    addStatCondition(query, toughness, 'f.toughness');
    addStatCondition(query, loyalty, 'f.loyalty');
    addInCondition(query, setTokens, 'c.set_code');
    addInCondition(query, rarities, 'c.rarity');
    addLikeCondition(query, flavorTextTokens, 'f.flavor_text');

    return query;
};

const getCardByID = async (id) => {
    return await connection.query(
        `SELECT
        c.id card_id,
        c.layout,
        c.name,
        c.set_name,
        c.set_code,
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
        a.name,
        a.set_name,
        a.set_code,
        a.layout,
        s.sets_json,
        r.rulings_json
        FROM (
            SELECT
            c.id card_id,
            c.name,
            c.set_name,
            c.set_code,
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

const getCardTypes = async () => {
    return await connection.query(
        `SELECT *
        FROM types;
    `,
        [],
    );
};

const getCardSets = async () => {
    return await connection.query(
        `SELECT *
        FROM sets;
    `,
        [],
    );
};

export default {
    getTotalResults,
    getCardsByProperties,
    getCardByID,
    getRandomCard,
    getCardTypes,
    getCardSets,
};
