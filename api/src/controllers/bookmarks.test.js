import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import { requestMock, responseMock } from '../testing/helpers';
import BookmarkService from '../services/bookmarks';
import { createBookmark, listBookmarks, deleteBookmark } from './bookmarks';

jest.mock('../services/bookmarks');

describe('Bookmark Controller', () => {
    describe('createBookmark', () => {
        test('returns an error if one occurred while creating a bookmark', async () => {
            const body = {
                cardID: 123,
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            BookmarkService.createBookmark.mockImplementation(() => {
                throw new Error();
            });

            await createBookmark(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while creating your bookmark.',
                },
            });
        });

        test('returns the bookmark if it already existed', async () => {
            const body = {
                cardID: 123,
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            const result = {
                bookmark: {
                    id: 123,
                    card_id: 456,
                    faces_json: '{}',
                    name: 'test card',
                },
            };
            BookmarkService.createBookmark.mockResolvedValue({
                created: false,
                bookmark: result.bookmark,
            });

            await createBookmark(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });

        test('returns the bookmark if it was created', async () => {
            const body = {
                cardID: 123,
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            const result = {
                bookmark: {
                    id: 123,
                    card_id: 456,
                    faces_json: '{}',
                    name: 'test card',
                },
            };
            BookmarkService.createBookmark.mockResolvedValue({
                created: true,
                bookmark: result.bookmark,
            });

            await createBookmark(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });

    describe('listBookmarks', () => {
        test('returns an error if one occurred while retrieving the list of bookmarks', async () => {
            const session = {
                accountID: 1,
            };
            const req = requestMock({ session });
            const res = responseMock();
            BookmarkService.listBookmarks.mockImplementation(() => {
                throw new Error();
            });

            await listBookmarks(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while retrieving your bookmark list.',
                },
            });
        });

        test('returns the list of bookmarks if it was retrieved successfully', async () => {
            const session = {
                accountID: 1,
            };
            const req = requestMock({ session });
            const res = responseMock();
            const result = {
                bookmarks: [
                    {
                        id: 123,
                        card_id: 456,
                        faces_json: '{}',
                        name: 'test card',
                    },
                    {
                        id: 234,
                        card_id: 567,
                        faces_json: '{}',
                        name: 'test card 2',
                    },
                ],
            };
            BookmarkService.listBookmarks.mockResolvedValue(result);

            await listBookmarks(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });

    describe('deleteBookmark', () => {
        test('returns an unauthorized error if one occurred while deleting the bookmark', async () => {
            const params = {
                bookmarkID: 123,
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            BookmarkService.deleteBookmark.mockImplementation(() => {
                throw new UnauthorizedError();
            });

            await deleteBookmark(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'You do not have permission to delete this bookmark. Please log in and try again.',
                },
            });
        });

        test('returns a not found error if one occurred while deleting the bookmark', async () => {
            const params = {
                bookmarkID: 123,
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            BookmarkService.deleteBookmark.mockImplementation(() => {
                throw new NotFoundError();
            });

            await deleteBookmark(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'This bookmark could not be deleted (it may have been deleted already).',
                },
            });
        });

        test('returns an error if one occurred while deleting the bookmark', async () => {
            const params = {
                bookmarkID: 123,
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            BookmarkService.deleteBookmark.mockImplementation(() => {
                throw new Error();
            });

            await deleteBookmark(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while deleting your bookmark.',
                },
            });
        });

        test('returns the list of bookmarks if it was retrieved successfully', async () => {
            const session = {
                accountID: 1,
            };
            const req = requestMock({ session });
            const res = responseMock();
            BookmarkService.deleteBookmark.mockResolvedValue();

            await deleteBookmark(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
