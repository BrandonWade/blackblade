import BookmarkRepository from '../repositories/bookmarks';

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

const deleteBookmark = async (bookmarkID, accountID) => {
    try {
        await BookmarkRepository.deleteBookmark(bookmarkID, accountID);
    } catch (e) {
        console.error('error deleting bookmark', e);
        throw e;
    }

    return;
};

export default {
    listBookmarks,
    deleteBookmark,
};
