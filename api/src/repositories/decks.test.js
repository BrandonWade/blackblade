import DeckRepository from '../repositories/decks';
import { connection } from '../db';

jest.mock('../db');

describe('Deck Repository', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createDeck', () => {
        test('throws an error if one occurred while creating a deck', async () => {
            const accountID = 123;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 12345';

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckRepository.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const accountID = 123;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 12345';

            connection.query.mockResolvedValue();

            await expect(() =>
                DeckRepository.createDeck(accountID, name, visibility, notes),
            ).not.toThrow();
        });
    });

    describe('getPublicIDsByID', () => {
        test('throws an error if one occurred while retrieving the public ids for the deck with the given id', async () => {
            const deckID = 123;

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckRepository.getPublicIDsByID(deckID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const deckID = 123;

            connection.query.mockResolvedValue();

            await expect(() =>
                DeckRepository.getPublicIDsByID(deckID),
            ).not.toThrow();
        });
    });

    describe('getDeckByPublicID', () => {
        test('throws an error if one occurred while retrieving the deck with the given public id', async () => {
            const publicID = 'abcdef1234567890';

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckRepository.getDeckByPublicID(publicID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const publicID = 'abcdef1234567890';

            connection.query.mockResolvedValue();

            await expect(() =>
                DeckRepository.getDeckByPublicID(publicID),
            ).not.toThrow();
        });
    });

    describe('getDeckCardsByPublicID', () => {
        test('throws an error if one occurred while retrieving the deck cards associated with the given public id', async () => {
            const publicID = 'abcdef1234567890';

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckRepository.getDeckCardsByPublicID(publicID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const publicID = 'abcdef1234567890';

            connection.query.mockResolvedValue();

            await expect(() =>
                DeckRepository.getDeckCardsByPublicID(publicID),
            ).not.toThrow();
        });
    });

    describe('listDecks', () => {
        test('throws an error if one occurred while retrieving the deck list for the given account id', async () => {
            const accountID = 123;

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckRepository.listDecks(accountID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const accountID = 123;

            connection.query.mockResolvedValue();

            await expect(() =>
                DeckRepository.listDecks(accountID),
            ).not.toThrow();
        });
    });

    describe('deleteDeckByPublicID', () => {
        test('throws an error if one occurred while retrieving the deck with the given public id', async () => {
            const accountID = 123;
            const publicID = 'abcdef1234567890';

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckRepository.deleteDeckByPublicID(accountID, publicID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const accountID = 123;
            const publicID = 'abcdef1234567890';

            connection.query.mockResolvedValue();

            await expect(() =>
                DeckRepository.deleteDeckByPublicID(accountID, publicID),
            ).not.toThrow();
        });
    });

    describe('exportDeckByPublicID', () => {
        test('throws an error if one occurred while retrieving the deck with the given public id', async () => {
            const accountID = 123;
            const publicID = 'abcdef1234567890';

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckRepository.exportDeckByPublicID(publicID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const accountID = 123;
            const publicID = 'abcdef1234567890';

            connection.query.mockResolvedValue();

            await expect(() =>
                DeckRepository.exportDeckByPublicID(publicID),
            ).not.toThrow();
        });
    });
});
