import { query } from '../db';

const getPageCount = (tokens) => {
    const params = tokens.map((t) => `+${t}*`).join(' ');
    return query(
        `SELECT
        COUNT(*) pages
        FROM cards c
        INNER JOIN card_sets_images s ON c.id = s.card_id
        WHERE c.type_line != 'vanguard'
        AND MATCH (c.name)
        AGAINST (? IN BOOLEAN MODE)
    `,
        [params],
    );
};

const getCardsByName = (tokens, page, pageSize) => {
    const params = tokens.map((t) => `+${t}*`).join(' ');
    return query(
        `SELECT
        c.id,
        c.name,
        c.mana_cost,
        c.type_line,
        c.oracle_text,
        c.rarity,
        c.power,
        c.toughness,
        c.loyalty,
        c.artist,
        s.sets
        FROM cards c
        INNER JOIN card_sets_images s ON c.id = s.card_id
        WHERE c.type_line != 'vanguard'
        AND MATCH (c.name)
        AGAINST (? IN BOOLEAN MODE)
        GROUP BY c.oracle_id
        ORDER BY c.name
        LIMIT ?, ?
    `,
        [params, (page - 1) * pageSize, pageSize],
    );
};

const getCardByID = (id) => {
    return query(
        `SELECT
        c.id,
        c.name,
        c.mana_cost,
        c.type_line,
        c.oracle_text,
        c.rarity,
        c.power,
        c.toughness,
        c.loyalty,
        c.artist,
        s.sets
        FROM cards c
        INNER JOIN card_sets_images s ON c.id = s.card_id
        WHERE c.type_line != 'vanguard'
        AND c.id = ?
    `,
        [id],
    );
};

export default {
    getPageCount,
    getCardsByName,
    getCardByID,
};
