import { query } from '../db';

const getCardsByName = (tokens) => {
    let cardsQuery = `SELECT
        c.id,
        c.name,
        c.mana_cost,
        c.type_line,
        c.oracle_text,
        c.set_name,
        c.rarity,
        c.power,
        c.toughness,
        c.loyalty,
        c.artist
        FROM cards c
        WHERE lang = 'en'
    `;

    // TODO: Use a query builder (dynamic queries only)
    for (let i = 0; i < tokens.length; i++) {
        cardsQuery += ' AND name LIKE ?';
    }

    cardsQuery += ` GROUP BY c.oracle_id
        LIMIT 100
    `;

    return query(
        cardsQuery,
        tokens.map((token) => `%${token}%`),
    );
};

export default {
    getCardsByName,
};
