import { query } from '../db';

const createDeck = (accountID, name) => {
    return query(
        `INSERT INTO decks (
            public_id,
            account_id,
            name
        ) VALUES (
            LEFT(MD5(RAND()), 16),
            ?,
            ?
        )
    `,
        [accountID, name],
    );
};

const getDeckByID = (deckID) => {
    return query(
        `SELECT public_id
        FROM decks
        WHERE id = ?
    `,
        [deckID],
    );
};

const getCardsByPublicID = (publicID) => {
    return query(
        `SELECT
        k.id deck_card_id,
        k.count,
        f.card_id,
        f.name,
        f.mana_cost,
        f.type_line
        FROM deck_cards k
        INNER JOIN decks d ON d.id = k.deck_id
        INNER JOIN card_faces f ON f.card_id = k.card_id
        WHERE d.public_id = ?
    `,
        [publicID],
    );
};

export default {
    createDeck,
    getDeckByID,
    getCardsByPublicID,
};
