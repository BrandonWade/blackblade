import BookmarkRepository from '../repositories/bookmarks';
import { connection } from '../db';

jest.mock('../db');

describe('Bookmark Repository', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createBookmark', () => {
        test('throws an error if one occurred while creating a bookmark', async () => {
            const accountID = 123;
            const cardID = 456;

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                BookmarkRepository.createBookmark(accountID, cardID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const accountID = 123;
            const cardID = 456;

            connection.query.mockResolvedValue();

            await expect(() =>
                BookmarkRepository.createBookmark(accountID, cardID),
            ).not.toThrow();
        });
    });

    describe('getBookmark', () => {
        test('throws an error if one occurred while retrieving the bookmark with the given id', async () => {
            const accountID = 123;
            const bookmarkID = 456;

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                BookmarkRepository.getBookmark(accountID, bookmarkID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const accountID = 123;
            const bookmarkID = 456;

            connection.query.mockResolvedValue();

            await expect(() =>
                BookmarkRepository.getBookmark(accountID, bookmarkID),
            ).not.toThrow();
        });
    });

    describe('getBookmarkByCardID', () => {
        test('throws an error if one occurred while retrieving the bookmark associated with the given card id', async () => {
            const accountID = 123;
            const cardID = 456;

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                BookmarkRepository.getBookmarkByCardID(accountID, cardID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const accountID = 123;
            const cardID = 456;

            connection.query.mockResolvedValue();

            await expect(() =>
                BookmarkRepository.getBookmarkByCardID(accountID, cardID),
            ).not.toThrow();
        });
    });

    describe('listBookmarks', () => {
        test('throws an error if one occurred while retrieving the list of bookmarks for the account with the given id', async () => {
            const accountID = 123;

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                BookmarkRepository.listBookmarks(accountID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const accountID = 123;

            connection.query.mockResolvedValue();

            await expect(() =>
                BookmarkRepository.listBookmarks(accountID),
            ).not.toThrow();
        });
    });

    describe('deleteBookmark', () => {
        test('throws an error if one occurred while deleting the bookmark with the given id', async () => {
            const accountID = 123;
            const bookmarkID = 456;

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                BookmarkRepository.deleteBookmark(accountID, bookmarkID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const accountID = 123;
            const bookmarkID = 456;

            connection.query.mockResolvedValue();

            await expect(() =>
                BookmarkRepository.deleteBookmark(accountID, bookmarkID),
            ).not.toThrow();
        });
    });
});
