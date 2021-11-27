import DeckService from '../services/decks';
import DeckRepository from '../repositories/decks';

jest.mock('../repositories/decks');

describe('Deck Service', () => {
    describe('createDeck', () => {
        test('throws an error if one occurred while creating the deck', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';

            DeckRepository.createDeck.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });

        test('throws an error if the id for the newly created deck is not available', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const createResult = [];

            DeckRepository.createDeck.mockResolvedValue(createResult);

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });

        test('throws an error if one occurred while getting the public ids', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const createResult = [
                {
                    insertId: 987,
                },
            ];

            DeckRepository.createDeck.mockResolvedValue(createResult);
            DeckRepository.getPublicIDsByID.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });

        test('throws an error if the public ids for the newly created deck are not available', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const createResult = [
                {
                    insertId: 987,
                },
            ];
            const publicIDsResult = [];

            DeckRepository.createDeck.mockResolvedValue(createResult);
            DeckRepository.getPublicIDsByID.mockImplementation(publicIDsResult);

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });

        test('returns the account public id and the newly created deck public id', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const createResult = [
                {
                    insertId: 987,
                },
            ];
            const publicIDsResult = [
                {
                    deck_public_id: 3456,
                    account_public_id: 8765,
                },
            ];

            DeckRepository.createDeck.mockResolvedValue(createResult);
            DeckRepository.getPublicIDsByID.mockImplementation(publicIDsResult);

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });
    });
});
