import BookmarkRepository from '../repositories/bookmarks';
import BookmarkService from './bookmarks';

jest.mock('../repositories/bookmarks');

describe('Bookmark Service', () => {
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
    });
});
