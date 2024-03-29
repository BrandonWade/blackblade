import BookmarkRepository from '../repositories/bookmarks';

const createBookmark = async (accountID, cardID) => {
    let bookmark;

    try {
        // Check if the bookmark already exists
        const [existsResult] = await BookmarkRepository.getBookmarkByCardID(
            accountID,
            cardID,
        );
        if (existsResult?.length === 1 && existsResult?.[0]?.id) {
            return {
                created: false,
                bookmark: existsResult?.[0],
            };
        }

        // If it doesn't, create a new one and return it
        const [createResult] = await BookmarkRepository.createBookmark(
            accountID,
            cardID,
        );
        const bookmarkID = createResult?.insertId || 0;
        if (!bookmarkID) {
            throw new Error('error inserting new bookmark row');
        }

        const [getResult] = await BookmarkRepository.getBookmark(
            accountID,
            bookmarkID,
        );
        if (getResult?.length !== 1 || !getResult?.[0]?.id) {
            throw new Error(
                `error getting created bookmark with id ${bookmarkID}`,
            );
        }

        bookmark = getResult[0];
    } catch (e) {
        console.error('error creating bookmark', e);
        throw e;
    }

    return {
        created: true,
        bookmark,
    };
};

const listBookmarks = async (accountID) => {
    let bookmarks;

    try {
        [bookmarks] = await BookmarkRepository.listBookmarks(accountID);
    } catch (e) {
        console.error('error listing bookmarks', e);
        throw e;
    }

    return {
        bookmarks,
    };
};

const deleteBookmark = async (accountID, bookmarkID) => {
    try {
        await BookmarkRepository.deleteBookmark(accountID, bookmarkID);
    } catch (e) {
        console.error('error deleting bookmark', e);
        throw e;
    }

    return;
};

export default {
    createBookmark,
    listBookmarks,
    deleteBookmark,
};
