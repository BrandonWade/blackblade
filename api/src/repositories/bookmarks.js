import { connection } from '../db';

const createBookmark = async (accountID, cardID) => {
    return connection.query(
        `INSERT INTO bookmarks (
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

const getBookmark = async (accountID, bookmarkID) => {
    return connection.query(
        `SELECT
        b.id,
        b.card_id,
        c.faces_json,
        c.name
        FROM bookmarks b
        INNER JOIN cards c ON c.id = b.card_id
        WHERE b.account_id = ?
        AND b.id = ?
    `,
        [accountID, bookmarkID],
    );
};

const getBookmarkByCardID = async (accountID, cardID) => {
    return connection.query(
        `SELECT
        b.id,
        b.card_id,
        c.faces_json,
        c.name
        FROM bookmarks b
        INNER JOIN cards c ON c.id = b.card_id
        WHERE b.account_id = ?
        AND b.card_id = ?
    `,
        [accountID, cardID],
    );
};

const listBookmarks = async (accountID) => {
    return connection.query(
        `SELECT
        b.id,
        b.card_id,
        c.name,
        c.set_name,
        c.set_code,
        c.layout,
        c.faces_json
        FROM bookmarks b
        INNER JOIN cards c ON c.id = b.card_id
        WHERE b.account_id = ?
    `,
        [accountID],
    );
};

const deleteBookmark = async (accountID, bookmarkID) => {
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
    getBookmark,
    getBookmarkByCardID,
    listBookmarks,
    deleteBookmark,
};
