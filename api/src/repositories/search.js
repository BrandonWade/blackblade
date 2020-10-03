import { connection } from '../db';

const getTotalResults = async (tokens) => {
    const params = tokens.map(() => 'f.name LIKE ?').join(' AND ');
    return await connection.query(
        `SELECT
        COUNT(*) total_results
        FROM (
          SELECT
          c.*
          FROM cards c
          INNER JOIN card_faces f ON c.id = f.card_id
          WHERE ${params}
          GROUP BY c.oracle_id
        ) a;
    `,
        tokens.map((token) => `%${token}%`),
    );
};

const getCardsByName = async (tokens, page, pageSize) => {
    const params = tokens.map(() => 'f.name LIKE ?').join(' AND ');
    return await connection.query(
        `SELECT
        c.id card_id,
        c.cmc,
        c.rarity,
        c.layout,
        s.sets_json
        FROM card_faces f
        INNER JOIN cards c ON c.id = f.card_id
        INNER JOIN card_sets_list s ON s.id = c.card_sets_list_id
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
