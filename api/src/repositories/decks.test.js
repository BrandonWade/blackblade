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
});
