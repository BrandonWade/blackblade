import SearchRepository from '../repositories/search';
import { connection, builder } from '../db';
import { builderMock } from '../helpers/testing';
import {
    addLikeCondition,
    addNegatableLikeCondition,
    addColorConditions,
    addColorlessCondition,
    addStatCondition,
    addInCondition,
} from '../helpers/search';

jest.mock('../db');
jest.mock('../helpers/search');

describe('Search Repository', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getCardsByProperties', () => {
        test('throws an error if one occurred while building the search query', () => {
            const nameTokens = [];
            const textTokens = [];
            const typeTokens = [];
            const colors = [];
            const colorless = [];
            const matchType = 'exact';
            const setTokens = [];
            const cmc = 0;
            const power = 0;
            const toughness = 0;
            const loyalty = 0;
            const rarities = [];
            const flavorTextTokens = [];

            builder.mockImplementation(() => {
                throw new Error();
            });

            expect(() =>
                SearchRepository.getCardsByProperties(
                    nameTokens,
                    textTokens,
                    typeTokens,
                    colors,
                    colorless,
                    matchType,
                    setTokens,
                    cmc,
                    power,
                    toughness,
                    loyalty,
                    rarities,
                    flavorTextTokens,
                ),
            ).toThrow();
        });

        test('returns without an error', () => {
            const nameTokens = [];
            const textTokens = [];
            const typeTokens = [];
            const colors = [];
            const colorless = [];
            const matchType = 'exact';
            const setTokens = [];
            const cmc = 0;
            const power = 0;
            const toughness = 0;
            const loyalty = 0;
            const rarities = [];
            const flavorTextTokens = [];

            const bm = builderMock();
            builder.mockReturnValue(bm);
            addLikeCondition.mockImplementation();
            addNegatableLikeCondition.mockImplementation();
            addColorConditions.mockImplementation();
            addColorlessCondition.mockImplementation();
            addStatCondition.mockImplementation();
            addInCondition.mockImplementation();

            expect(() =>
                SearchRepository.getCardsByProperties(
                    nameTokens,
                    textTokens,
                    typeTokens,
                    colors,
                    colorless,
                    matchType,
                    setTokens,
                    cmc,
                    power,
                    toughness,
                    loyalty,
                    rarities,
                    flavorTextTokens,
                ),
            ).not.toThrow();
            expect(bm.select).toHaveBeenCalledTimes(2);
            expect(bm.limit).not.toHaveBeenCalled();
            expect(bm.offset).not.toHaveBeenCalled();
        });

        test('returns after setting the limit and offset using the provided values', () => {
            const nameTokens = [];
            const textTokens = [];
            const typeTokens = [];
            const colors = [];
            const colorless = [];
            const matchType = 'exact';
            const setTokens = [];
            const cmc = 0;
            const power = 0;
            const toughness = 0;
            const loyalty = 0;
            const rarities = [];
            const flavorTextTokens = [];
            const page = 1;
            const pageSize = 60;

            const bm = builderMock();
            builder.mockReturnValue(bm);
            addLikeCondition.mockImplementation();
            addNegatableLikeCondition.mockImplementation();
            addColorConditions.mockImplementation();
            addColorlessCondition.mockImplementation();
            addStatCondition.mockImplementation();
            addInCondition.mockImplementation();

            expect(() =>
                SearchRepository.getCardsByProperties(
                    nameTokens,
                    textTokens,
                    typeTokens,
                    colors,
                    colorless,
                    matchType,
                    setTokens,
                    cmc,
                    power,
                    toughness,
                    loyalty,
                    rarities,
                    flavorTextTokens,
                    page,
                    pageSize,
                ),
            ).not.toThrow();
            expect(bm.select).toHaveBeenCalledTimes(2);
            expect(bm.limit).toHaveBeenCalledTimes(1);
            expect(bm.offset).toHaveBeenCalledTimes(1);
        });
    });

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
