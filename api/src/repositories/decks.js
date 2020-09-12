import { query, transaction, commit } from '../db';

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

const getPublicIDByID = (deckID) => {
    return query(
        `SELECT public_id
        FROM decks
        WHERE id = ?
    `,
        [deckID],
    );
};

const saveDeck = async (deckID, deck) => {
    // const rows = deck.map((c) => [deckID, c.card_id, c.count]);
    // await transaction();
    // const deleteResults = await query(
    //     `DELETE
    //     FROM deck_cards
    //     WHERE deck_id = ?
    // `,
    //     [deckID],
    // );
    // if (!deleteResults) {
    //     console.error('save deck: error deleting existing cards');
    //     return;
    // }
    // const insertResults = await query(
    //     `INSERT INTO deck_cards (deck_id, card_id, count)
    //     VALUES ?
    // `,
    //     [rows],
    // );
    // if (!insertResults) {
    //     console.error('save deck: error inserting new cards');
    //     return;
    // }
    // await commit((err) => console.error('something terrible happened', err));
};

const getIDByPublicID = (publicID) => {
    return query(
        `SELECT id
        FROM decks
        WHERE public_id = ?
    `,
        [publicID],
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
    getPublicIDByID,
    saveDeck,
    getIDByPublicID,
    getCardsByPublicID,
};
