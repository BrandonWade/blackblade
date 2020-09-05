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

const getDeckByID = (deckID, accountID) => {
    return query(
        `SELECT public_id
        FROM decks
        WHERE id = ?
        AND account_id = ?
    `,
        [deckID, accountID],
    );
};

export default {
    createDeck,
    getDeckByID,
};
