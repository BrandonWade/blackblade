import { connection } from '../db';
import NotFoundError from '../errors/not_found';

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

const saveDeck = async (
    accountID,
    deckID,
    name,
    visibility,
    deckSize,
    maybeboardSize,
    colors,
    cards,
) => {
    const tx = await connection.getConnection();
    await tx.beginTransaction();

    let success = false;
    try {
        await tx.query(
            `DELETE c
            FROM deck_cards c
            INNER JOIN decks d ON d.id = c.deck_id
            WHERE d.account_id = ?
            AND c.deck_id = ?
        `,
            [accountID, deckID],
        );

        // Only run if there are any cards in the deck to save
        if (cards.length) {
            await tx.query(
                `INSERT INTO deck_cards(
                    deck_id,
                    card_id,
                    count,
                    selection_type,
                    location
                ) VALUES ?
            `,
                [
                    cards.map((c) => [
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
        await tx.query(
            `UPDATE decks
            SET name = ?,
            visibility = ?,
            deck_size = ?,
            maybeboard_size = ?,
            colors = ?
            WHERE account_id = ?
            AND id = ?
        `,
            [
                name,
                visibility,
                deckSize,
                maybeboardSize,
                colors,
                accountID,
                deckID,
            ],
        );

        await tx.commit();

        success = true;
    } catch (e) {
        await tx.rollback();
        throw e;
    } finally {
        await tx.release();
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
        c.name,
        c.set_name,
        c.set_code,
        c.cmc,
        c.collector_number,
        c.faces_json,
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

const listDecks = async (accountID) => {
    return connection.query(
        `SELECT
        d.public_id,
        d.name,
        d.deck_size,
        d.maybeboard_size,
        d.colors
        FROM decks d
        WHERE d.account_id = ?
    `,
        [accountID],
    );
};

const deleteDeckByPublicID = async (publicID, accountID) => {
    return connection.query(
        `DELETE d
        FROM decks d
        WHERE d.account_id = ?
        AND d.public_id = ?
    `,
        [accountID, publicID],
    );
};

const exportDeckByPublicID = async (publicID) => {
    return connection.query(
        `SELECT
        k.count,
        k.selection_type,
        c.name,
        c.set_code,
        c.collector_number
        FROM decks d
        INNER JOIN deck_cards k ON d.id = k.deck_id
        INNER JOIN cards c ON c.id = k.card_id
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
    listDecks,
    deleteDeckByPublicID,
    exportDeckByPublicID,
};
