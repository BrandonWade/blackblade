import SearchRepository from '../repositories/search';
import { connection } from '../db';

jest.mock('../db');
jest.mock('../helpers/search');

describe('Search Repository', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    // TODO: Figure out how to test builder

    describe('getCardByID', () => {
        test('throws an error if one occurred while retrieving the card with the provided id', async () => {
            const cardID = 123;

            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                SearchRepository.getCardByID(cardID),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            const cardID = 123;

            connection.query.mockResolvedValue();

            await expect(() =>
                SearchRepository.getCardByID(cardID),
            ).not.toThrow();
        });
    });

    describe('getRandomCard', () => {
        test('throws an error if one occurred while retrieving a random card', async () => {
            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                SearchRepository.getRandomCard(),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            connection.query.mockResolvedValue();

            await expect(() => SearchRepository.getRandomCard()).not.toThrow();
        });
    });

    describe('getCardTypes', () => {
        test('throws an error if one occurred while retrieving the list of card types', async () => {
            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                SearchRepository.getCardTypes(),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            connection.query.mockResolvedValue();

            await expect(() => SearchRepository.getCardTypes()).not.toThrow();
        });
    });

    describe('getCardSets', () => {
        test('throws an error if one occurred while retrieving the list of card sets', async () => {
            connection.query.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                SearchRepository.getCardSets(),
            ).rejects.toThrow();
        });

        test('returns if no error occurred', async () => {
            connection.query.mockResolvedValue();

            await expect(() => SearchRepository.getCardSets()).not.toThrow();
        });
    });
});
