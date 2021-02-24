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

const saveDeck = async (deckID, name, deck) => {
    const conn = await connection.getConnection();
    await conn.beginTransaction();

    let success = false;
    try {
        await conn.query(
            `DELETE
            FROM deck_cards
            WHERE deck_id = ?
        `,
            [deckID],
        );

        // Only run if there are any cards in the deck to save
        if (deck.length) {
            await conn.query(
                `INSERT INTO deck_cards(
                    deck_id,
                    card_id,
                    count,
                    selection_type,
                    location
                ) VALUES ?
            `,
                [
                    deck.map((c) => [
                        deckID,
                        c.card_id,
                        c.count,
                        c.selection_type,
                        c.location,
                    ]),
                ],
            );
        }

        // Update the deck name
        await conn.query(
            `UPDATE decks
            SET name = ?
            WHERE id = ?
        `,
            [name, deckID],
        );

        await conn.commit();

        success = true;
    } catch (e) {
        throw e;
    } finally {
        await conn.release();
    }

    return success;
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
        k.card_id,
        k.count,
        k.selection_type,
        k.location,
        c.id card_id,
        c.cmc,
        c.layout,
        s.sets_json
        FROM deck_cards k
        INNER JOIN decks d ON d.id = k.deck_id
        INNER JOIN cards c ON c.id = k.card_id
        INNER JOIN card_sets_list s ON s.id = c.card_sets_list_id
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
