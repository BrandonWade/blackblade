import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import BookmarkService from '../services/bookmarks';
import { errorMessage } from '../helpers/messages';

const createBookmark = async (req, res) => {
    const { accountID } = req.session;
    const { cardID } = req.body;

    try {
        await BookmarkService.createBookmark(cardID, accountID);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage(
                'An error occurred while creating your bookmark.',
            ),
        });
    }

    return res.status(StatusCodes.CREATED).send();
};

const listBookmarks = async (req, res) => {
    const { accountID } = req.session;
    let bookmarks;

    try {
        bookmarks = await BookmarkService.listBookmarks(accountID);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage(
                'An error occurred while retrieving your bookmark list.',
            ),
        });
    }

    return res.status(StatusCodes.OK).json(bookmarks);
};

const deleteBookmark = async (req, res) => {
    const { accountID } = req.session;
    const { bookmarkID } = req.params;

    try {
        await BookmarkService.deleteBookmark(bookmarkID, accountID);
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: errorMessage(
                    'You do not have permission to delete this bookmark. Please log in and try again.',
                ),
            });
        } else if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: errorMessage(
                    'This bookmark could not be deleted (it may have been deleted already).',
                ),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occurred while deleting your bookmark.',
                ),
            });
        }
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};

export { createBookmark, listBookmarks, deleteBookmark };
