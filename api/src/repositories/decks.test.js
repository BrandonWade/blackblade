import DeckRepository from '../repositories/decks';
import { transactionMock } from '../helpers/testing';
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

    describe('saveDeck', () => {
        test('throws an error if one occurred while deleting the existing cards in the deck with the given id', async () => {
            const accountID = 123;
            const deckID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 12345';
            const deckSize = 10;
            const maybeboardSize = 5;
            const colors = '';
            const cards = [];

            const tx = transactionMock();
            tx.query.mockImplementation(() => {
                throw new Error();
            });
            connection.getConnection.mockResolvedValue(tx);

            await expect(() =>
                DeckRepository.saveDeck(
                    accountID,
                    deckID,
                    name,
                    visibility,
                    notes,
                    deckSize,
                    maybeboardSize,
                    colors,
                    cards,
                ),
            ).rejects.toThrow();
            expect(tx.query).toHaveBeenCalledTimes(1);
            expect(tx.commit).not.toHaveBeenCalled();
            expect(tx.rollback).toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
        });

        test('returns true if the deck is empty and no error occurred', async () => {
            const accountID = 123;
            const deckID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 12345';
            const deckSize = 10;
            const maybeboardSize = 5;
            const colors = '';
            const cards = [];

            const tx = transactionMock();
            tx.query.mockResolvedValue();
            connection.getConnection.mockResolvedValue(tx);

            const output = await DeckRepository.saveDeck(
                accountID,
                deckID,
                name,
                visibility,
                notes,
                deckSize,
                maybeboardSize,
                colors,
                cards,
            );

            expect(tx.query).toHaveBeenCalledTimes(2);
            expect(tx.commit).toHaveBeenCalled();
            expect(tx.rollback).not.toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
            expect(output).toBe(true);
        });

        test('throws an error if one occurred while inserting the new cards into the deck with the given id', async () => {
            const accountID = 123;
            const deckID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 12345';
            const deckSize = 1;
            const maybeboardSize = 0;
            const colors = '{U}{W}{B}{R}{G}';
            const cards = [
                {
                    count: 1,
                    name: 'test card name',
                    combined_cost: '{U}{W}{B}{R}{G}',
                    is_white: true,
                    is_blue: true,
                    is_black: true,
                    is_red: true,
                    is_green: true,
                    card_id: 555,
                    selection_type: 'automatic',
                    location: 'deck',
                },
            ];

            const tx = transactionMock();
            tx.query.mockImplementationOnce().mockImplementationOnce(() => {
                throw new Error();
            });
            connection.getConnection.mockResolvedValue(tx);

            await expect(() =>
                DeckRepository.saveDeck(
                    accountID,
                    deckID,
                    name,
                    visibility,
                    notes,
                    deckSize,
                    maybeboardSize,
                    colors,
                    cards,
                ),
            ).rejects.toThrow();
            expect(tx.query).toHaveBeenCalledTimes(2);
            expect(tx.commit).not.toHaveBeenCalled();
            expect(tx.rollback).toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
        });

        test('throws an error if one occurred while inserting the new cards into the deck with the given id', async () => {
            const accountID = 123;
            const deckID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 12345';
            const deckSize = 1;
            const maybeboardSize = 0;
            const colors = '{U}{W}{B}{R}{G}';
            const cards = [
                {
                    count: 1,
                    name: 'test card name',
                    combined_cost: '{U}{W}{B}{R}{G}',
                    is_white: true,
                    is_blue: true,
                    is_black: true,
                    is_red: true,
                    is_green: true,
                    card_id: 555,
                    selection_type: 'automatic',
                    location: 'deck',
                },
            ];

            const tx = transactionMock();
            tx.query
                .mockImplementationOnce()
                .mockImplementationOnce()
                .mockImplementationOnce(() => {
                    throw new Error();
                });
            connection.getConnection.mockResolvedValue(tx);

            await expect(() =>
                DeckRepository.saveDeck(
                    accountID,
                    deckID,
                    name,
                    visibility,
                    notes,
                    deckSize,
                    maybeboardSize,
                    colors,
                    cards,
                ),
            ).rejects.toThrow();
            expect(tx.query).toHaveBeenCalledTimes(3);
            expect(tx.commit).not.toHaveBeenCalled();
            expect(tx.rollback).toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
        });

        test('returns true if the deck is not empty and no error occurred', async () => {
            const accountID = 123;
            const deckID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 12345';
            const deckSize = 1;
            const maybeboardSize = 0;
            const colors = '{U}{W}{B}{R}{G}';
            const cards = [
                {
                    count: 1,
                    name: 'test card name',
                    combined_cost: '{U}{W}{B}{R}{G}',
                    is_white: true,
                    is_blue: true,
                    is_black: true,
                    is_red: true,
                    is_green: true,
                    card_id: 555,
                    selection_type: 'automatic',
                    location: 'deck',
                },
            ];

            const tx = transactionMock();
            tx.query.mockResolvedValue();
            connection.getConnection.mockResolvedValue(tx);

            const output = await DeckRepository.saveDeck(
                accountID,
                deckID,
                name,
                visibility,
                notes,
                deckSize,
                maybeboardSize,
                colors,
                cards,
            );

            expect(tx.query).toHaveBeenCalledTimes(3);
            expect(tx.commit).toHaveBeenCalled();
            expect(tx.rollback).not.toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
            expect(output).toBe(true);
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
