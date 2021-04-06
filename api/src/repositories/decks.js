import { connection } from '../db';

const createDeck = async (accountID, name, visibility) => {
    return connection.query(
        `INSERT INTO decks (
            public_id,
            account_id,
            name,
            visibility
        ) VALUES (
            LEFT(MD5(RAND()), 16),
            ?,
            ?,
            ?
        )
    `,
        [accountID, name, visibility],
    );
};

const getPublicIDsByID = async (deckID) => {
    return connection.query(
        `SELECT
        d.public_id deck_public_id,
        a.public_id account_public_id
        FROM decks d
        INNER JOIN accounts a ON d.account_id = a.id
        WHERE d.id = ?
    `,
        [deckID],
    );
};

const saveDeck = async (accountID, deckID, name, visibility, deck) => {
    const conn = await connection.getConnection();
    await conn.beginTransaction();

    let success = false;
    try {
        await conn.query(
            `DELETE c
            FROM deck_cards c
            INNER JOIN decks d ON d.id = c.deck_id
            WHERE d.account_id = ?
            AND c.deck_id = ?
        `,
            [accountID, deckID],
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

        // Update the deck info
        await conn.query(
            `UPDATE decks
            SET name = ?,
            visibility = ?
            WHERE account_id = ?
            AND id = ?
        `,
            [name, visibility, accountID, deckID],
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
        `SELECT
        a.public_id account_public_id,
        d.*
        FROM decks d
        INNER JOIN accounts a ON a.id = d.account_id
        WHERE d.public_id = ?
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
    getPublicIDsByID,
    saveDeck,
    getDeckByPublicID,
    getDeckCardsByPublicID,
};
