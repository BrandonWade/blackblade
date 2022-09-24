import { connection, builder } from '../db';
import {
    addLikeCondition,
    addNegatableLikeCondition,
    addColorConditions,
    addColorlessCondition,
    addStatCondition,
    addInCondition,
} from '../helpers/search';

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
) => {
    const subquery = builder()
        .select('oracle_id')
        .max('released_at AS released_at')
        .from('cards AS c')
        .innerJoin('card_faces AS f', 'f.card_id', 'c.id')
        .groupBy('oracle_id')
        .as('a');

    addLikeCondition(subquery, nameTokens, 'c.name');
    addLikeCondition(subquery, textTokens, 'f.oracle_text');
    addNegatableLikeCondition(subquery, typeTokens, 'type', 'f.type_line');
    addColorConditions(subquery, colors, matchType);
    addColorlessCondition(subquery, colorless, matchType);
    addStatCondition(subquery, cmc, 'c.cmc');
    addStatCondition(subquery, power, 'f.power');
    addStatCondition(subquery, toughness, 'f.toughness');
    addStatCondition(subquery, loyalty, 'f.loyalty');
    addInCondition(subquery, setTokens, 'c.set_code');
    addInCondition(subquery, rarities, 'c.rarity');
    addLikeCondition(subquery, flavorTextTokens, 'f.flavor_text');

    const query = builder()
        .select(
            'c.id AS card_id',
            'c.cmc',
            'c.name',
            'c.set_name',
            'c.set_code',
            'c.faces_json',
            'c.layout',
            's.sets_json',
        )
        .from(subquery)
        .joinRaw('INNER JOIN cards AS c USING(oracle_id, released_at)')
        .innerJoin('card_sets_list AS s', 's.id', 'c.card_sets_list_id')
        .groupBy('c.oracle_id', 'c.released_at')
        .orderBy('c.name');

    return query;
};

const getPaginatedResults = (query, page = null, pageSize = null) => {
    if (page !== null && pageSize !== null) {
        query.limit(pageSize).offset((page - 1) * pageSize);
    }

    return query;
};

const getTotalResults = (query) => {
    return builder().count('* AS total_results').from(query.as('b'));
};

const getCardByID = async (id) => {
    return await connection.query(
        `SELECT
        c.id card_id,
        c.tcgplayer_id,
        c.scryfall_uri,
        c.layout,
        c.name,
        c.set_name,
        c.set_code,
        c.faces_json,
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
        a.tcgplayer_id,
        a.scryfall_uri,
        a.name,
        a.set_name,
        a.set_code,
        a.faces_json,
        a.layout,
        s.sets_json,
        r.rulings_json
        FROM (
            SELECT
            c.id card_id,
            c.tcgplayer_id,
            c.scryfall_uri,
            c.name,
            c.set_name,
            c.set_code,
            c.faces_json,
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
    getCardsByProperties,
    getPaginatedResults,
    getTotalResults,
    getCardByID,
    getRandomCard,
    getCardTypes,
    getCardSets,
};
