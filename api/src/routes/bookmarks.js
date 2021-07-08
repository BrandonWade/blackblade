import express from 'express';
import validate from '../middleware/validate';
import authenticate from '../middleware/authenticate';
import { createBookmarkValidators } from '../validators/bookmarks';
import {
    createBookmark,
    listBookmarks,
    deleteBookmark,
} from '../controllers/bookmarks';

const bookmarks = express.Router();

bookmarks.post(
    '/',
    createBookmarkValidators,
    validate(),
    authenticate(
        'You must be logged in to create a bookmark. Please log in and try again.',
    ),
    createBookmark,
);
bookmarks.get(
    '/',
    authenticate(
        'You must be logged in to view your bookmarks. Please log in and try again.',
    ),
    listBookmarks,
);
bookmarks.delete('/:bookmarkID', deleteBookmark);

export default bookmarks;
