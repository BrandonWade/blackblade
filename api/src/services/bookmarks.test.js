import BookmarkRepository from '../repositories/bookmarks';
import BookmarkService from './bookmarks';

jest.mock('../repositories/bookmarks');

describe('Bookmark Service', () => {
    describe('createBookmark', () => {
        test('returns the bookmark with the given id if it already exists', async () => {
            const accountID = 1;
            const cardID = 456;
            const bookmarks = [
                {
                    id: 123,
                    card_id: cardID,
                    name: 'test card',
                    set_name: 'test set',
                    set_code: 'test set code',
                    layout: 'normal',
                    faces_json: '{}',
                },
            ];
            BookmarkRepository.getBookmarkByCardID.mockResolvedValue([
                bookmarks,
            ]);
            const { created, bookmark } = await BookmarkService.createBookmark(
                cardID,
                accountID,
            );

            expect(created).toBe(false);
            expect(bookmark).toEqual(bookmarks[0]);
        });

        test('throws an error if one occurred while creating the new bookmark', async () => {
            const accountID = 1;
            const cardID = 456;

            BookmarkRepository.getBookmarkByCardID.mockResolvedValue([]);
            BookmarkRepository.createBookmark.mockResolvedValue([]);

            await expect(() =>
                BookmarkService.createBookmark(cardID, accountID),
            ).rejects.toThrow();
        });

        test('throws an error if one occurred while retrieving the newly created bookmark', async () => {
            const accountID = 1;
            const cardID = 456;

            BookmarkRepository.getBookmarkByCardID.mockResolvedValue([]);
            BookmarkRepository.createBookmark.mockResolvedValue([
                {
                    insertId: 123,
                },
            ]);
            BookmarkRepository.getBookmark.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                BookmarkService.createBookmark(cardID, accountID),
            ).rejects.toThrow();
        });

        test('throws an error if the newly created bookmark could not be successfully retrieved', async () => {
            const accountID = 1;
            const cardID = 456;

            BookmarkRepository.getBookmarkByCardID.mockResolvedValue([]);
            BookmarkRepository.createBookmark.mockResolvedValue([
                {
                    insertId: 123,
                },
            ]);
            BookmarkRepository.getBookmark.mockResolvedValue([
                [
                    {
                        id: 123,
                        card_id: 456,
                        name: 'test card',
                        set_name: 'test set',
                        set_code: 'test set code',
                        layout: 'normal',
                        faces_json: '{}',
                    },
                    {
                        id: 321,
                        card_id: 789,
                        name: 'test card 2',
                        set_name: 'test set 2',
                        set_code: 'test set code 2',
                        layout: 'normal',
                        faces_json: '{}',
                    },
                ],
            ]);

            await expect(() =>
                BookmarkService.createBookmark(cardID, accountID),
            ).rejects.toThrow();
        });

        test('returns the newly created bookmark', async () => {
            const accountID = 1;
            const cardID = 456;
            const bookmark = {
                id: 123,
                card_id: 456,
                name: 'test card',
                set_name: 'test set',
                set_code: 'test set code',
                layout: 'normal',
                faces_json: '{}',
            };

            BookmarkRepository.getBookmarkByCardID.mockResolvedValue([]);
            BookmarkRepository.createBookmark.mockResolvedValue([
                {
                    insertId: 123,
                },
            ]);
            BookmarkRepository.getBookmark.mockResolvedValue([[bookmark]]);

            const output = await BookmarkService.createBookmark(
                cardID,
                accountID,
            );

            expect(output.created).toBe(true);
            expect(output.bookmark).toEqual(bookmark);
        });
    });

    describe('listBookmarks', () => {
        test('throws an error if one occurred while retrieving the bookmark list', async () => {
            const accountID = 1;

            BookmarkRepository.listBookmarks.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                BookmarkService.listBookmarks(accountID),
            ).rejects.toThrow();
        });

        test('returns the list of bookmarks for the provided account ID', async () => {
            const accountID = 1;
            const bookmarks = [
                {
                    id: 123,
                    card_id: 456,
                    name: 'test card',
                    set_name: 'test set',
                    set_code: 'test set code',
                    layout: 'normal',
                    faces_json: '{}',
                },
                {
                    id: 321,
                    card_id: 789,
                    name: 'test card 2',
                    set_name: 'test set 2',
                    set_code: 'test set code 2',
                    layout: 'normal',
                    faces_json: '{}',
                },
            ];

            BookmarkRepository.listBookmarks.mockResolvedValue([bookmarks]);
            const output = await BookmarkService.listBookmarks(accountID);

            expect(output).toEqual({
                bookmarks,
            });
        });
    });

    describe('deleteBookmark', () => {
        test('throws an error if one occurred while deleting the bookmark', async () => {
            const bookmarkID = 123;
            const accountID = 1;

            BookmarkRepository.deleteBookmark.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                BookmarkService.deleteBookmark(bookmarkID, accountID),
            ).rejects.toThrow();
        });

        test('returns nothing if the bookmark was successfully deleted', async () => {
            const bookmarkID = 123;
            const accountID = 1;

            BookmarkRepository.deleteBookmark.mockResolvedValue();
            const output = await BookmarkService.deleteBookmark(
                bookmarkID,
                accountID,
            );

            expect(output).toEqual();
        });
    });
});
