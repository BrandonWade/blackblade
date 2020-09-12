import { connection } from '../db';

const createDeck = async (accountID, name) => {
    return connection.query(
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

const getPublicIDByID = async (deckID) => {
    return connection.query(
        `SELECT public_id
        FROM decks
        WHERE id = ?
    `,
        [deckID],
    );
};

const saveDeck = async (deckID, deck) => {
    const conn = await connection.getConnection();
    await conn.beginTransaction();

    try {
        // Only run if there are any cards in the deck to save
        if (deck.length) {
            await conn.query(
                `INSERT IGNORE INTO deck_cards(
                    deck_id,
                    card_id,
                    count
                ) VALUES ?
            `,
                [deck.map((c) => [deckID, c.card_id, c.count])],
            );
        }

        // Delete any cards that used to be in the deck that were removed
        await conn.query(
            `DELETE
            FROM deck_cards
            WHERE deck_id = ?
            ${deck.length > 0 ? 'AND card_id NOT IN (?)' : ''}
        `,
            [deckID, deck.map((c) => c.card_id)],
        );
        await conn.commit();
    } catch (e) {
        console.error(e); // TODO: Handle
    }

    await conn.release();

    return true;
};

const getDeckByPublicID = async (publicID) => {
    return connection.query(
        `SELECT *
        FROM decks
        WHERE public_id = ?
    `,
        [publicID],
    );
};

const getDeckCardsByPublicID = async (publicID) => {
    return connection.query(
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
    getDeckByPublicID,
    getDeckCardsByPublicID,
};
