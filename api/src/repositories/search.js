import { query } from '../db';

const getPageCount = (tokens, pageSize) => {
    const params = tokens.map(() => 'f.name LIKE ?').join(' AND ');
    return query(
        `SELECT
        CEIL(COUNT(*) / ?) pages
        FROM (
          SELECT
          c.*
          FROM cards c
          INNER JOIN card_faces f ON c.id = f.card_id
          WHERE ${params}
          GROUP BY c.oracle_id
        ) a;
    `,
        [pageSize, ...tokens.map((token) => `%${token}%`)],
    );
};

const getCardsByName = (tokens, page, pageSize) => {
    const params = tokens.map(() => 'f.name LIKE ?').join(' AND ');
    return query(
        `SELECT
        c.id,
        c.rarity,
        c.oracle_id,
        c.set_name_image_json,
        f.name,
        f.mana_cost,
        f.type_line,
        f.oracle_text,
        f.power,
        f.toughness,
        f.loyalty,
        f.artist
        FROM card_faces f
        INNER JOIN cards c ON c.id = f.card_id
        WHERE ${params}
        GROUP BY c.oracle_id
        ORDER BY f.name
        LIMIT ?, ?;
        `,
        [
            ...tokens.map((token) => `%${token}%`),
            (page - 1) * pageSize,
            pageSize,
        ],
    );
};

const getCardByID = (id) => {
    return query(
        `SELECT
        c.id,
        c.rarity,
        c.set_name_image_json,
        f.name,
        f.mana_cost,
        f.type_line,
        f.oracle_text,
        f.power,
        f.toughness,
        f.loyalty,
        f.artist
        FROM card_faces f
        INNER JOIN cards c ON c.id = f.card_id
        WHERE c.id = ?;
    `,
        [id],
    );
};

export default {
    getPageCount,
    getCardsByName,
    getCardByID,
};