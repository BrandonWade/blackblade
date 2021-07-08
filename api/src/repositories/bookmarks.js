import { connection } from '../db';

const createBookmark = async (cardID, accountID) => {
    return connection.query(
        `INSERT IGNORE INTO bookmarks (
            card_id,
            account_id
        ) VALUES (
            ?,
            ?
        )
    `,
        [cardID, accountID],
    );
};

const listBookmarks = async (accountID) => {
    return connection.query(
        `SELECT
        b.id,
        b.card_id,
        c.faces_json,
        c.name
        FROM bookmarks b
        INNER JOIN cards c ON c.id = b.card_id
        WHERE b.account_id = ?
    `,
        [accountID],
    );
};

const deleteBookmark = async (bookmarkID, accountID) => {
    return connection.query(
        `DELETE b
        FROM bookmarks b
        WHERE b.id = ?
        AND b.account_id = ?
    `,
        [bookmarkID, accountID],
    );
};

export default {
    createBookmark,
    listBookmarks,
    deleteBookmark,
};
