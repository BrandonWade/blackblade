import { query } from '../db';

const getCardsByName = (tokens, limit = 30) => {
    const params = tokens.map((t) => `+${t}*`).join(' ');

    return query(
        `SELECT
        i.uri image,
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
        INNER JOIN card_image_uris i ON c.id = i.card_id
        WHERE i.image_type = 'normal'
        AND c.lang = 'en'
        AND c.type_line != 'vanguard'
        AND MATCH (c.name)
        AGAINST (? IN BOOLEAN MODE)
        GROUP BY c.oracle_id
        LIMIT ?
    `,
        [params, limit],
    );
};

export default {
    getCardsByName,
};
