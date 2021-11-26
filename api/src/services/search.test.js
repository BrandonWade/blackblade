import SearchService from '../services/search';
import SearchRepository from '../repositories/search';
import NotFoundError from '../errors/not_found';

jest.mock('../repositories/search');

describe('Search Service', () => {
    describe('searchCards', () => {
        test('throws an error if one occurred while retrieving the total number of results', async () => {
            const params = {
                name: 'test name',
                text: 'test text',
                selectedType: 'test type',
                colors: {
                    white: false,
                    blue: false,
                    black: false,
                    red: false,
                    green: false,
                    colorless: false,
                },
                selectedSets: 'test,sets',
                rarities: {
                    common: false,
                    uncommon: false,
                    rare: false,
                    mythic: false,
                },
                flavorText: 'test flavour text',
            };

            SearchRepository.getTotalResults.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                SearchService.searchCards(params),
            ).rejects.toThrow();
        });

        test('throws an error if one occurred while retrieving the results', async () => {
            const params = {
                name: 'test name',
                text: 'test text',
                selectedType: 'test type',
                colors: {
                    white: false,
                    blue: false,
                    black: false,
                    red: false,
                    green: false,
                    colorless: false,
                },
                selectedSets: 'test,sets',
                rarities: {
                    common: false,
                    uncommon: false,
                    rare: false,
                    mythic: false,
                },
                flavorText: 'test flavour text',
            };
            const totalResults = 75;

            SearchRepository.getTotalResults.mockResolvedValue([
                {
                    total_results: totalResults,
                },
            ]);
            SearchRepository.getCardsByProperties.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                SearchService.searchCards(params),
            ).rejects.toThrow();
        });

        test('returns the search results if they were retrieved successfully', async () => {
            const params = {
                name: 'test name',
                text: 'test text',
                selectedType: 'test type',
                colors: {
                    white: false,
                    blue: false,
                    black: false,
                    red: false,
                    green: false,
                    colorless: false,
                },
                selectedSets: 'test,sets',
                rarities: {
                    common: false,
                    uncommon: false,
                    rare: false,
                    mythic: false,
                },
                flavorText: 'test flavour text',
            };
            const totalResults = 75;
            const results = [
                {
                    card_id: 123,
                    cmc: 5.0,
                    name: 'test name',
                    set_name: 'test set name',
                    set_code: 'test',
                    faces_json: '{}',
                    layout: 'test_layout',
                    sets_json: '{}',
                },
            ];

            SearchRepository.getTotalResults.mockResolvedValue([
                {
                    total_results: totalResults,
                },
            ]);
            SearchRepository.getCardsByProperties.mockResolvedValue(results);

            const output = await SearchService.searchCards(params);

            expect(output.total_results).toBe(totalResults);
            expect(output.pages).toBe(2);
            expect(output.results).toEqual(results);
        });
    });

    describe('getCardByID', () => {
        test('throws an error if one occurred while retrieving the card with the given id', async () => {
            const id = 123;

            SearchRepository.getCardByID.mockImplementation(() => {
                throw new Error();
            });

            await expect(() => SearchService.getCardByID(id)).rejects.toThrow();
        });

        test('throws a not found error if no card was found with the given id', async () => {
            const id = 123;
            const result = [];

            SearchRepository.getCardByID.mockResolvedValue([result]);

            await expect(() => SearchService.getCardByID(id)).rejects.toThrow(
                NotFoundError,
            );
        });

        test('returns the card with the given id', async () => {
            const id = 123;
            const result = [
                {
                    card_id: 123,
                    cmc: 5.0,
                    name: 'test name',
                    set_name: 'test set name',
                    set_code: 'test',
                    faces_json: '{}',
                    layout: 'test_layout',
                    sets_json: '{}',
                },
            ];

            SearchRepository.getCardByID.mockResolvedValue([result]);

            const output = await SearchService.getCardByID(id);

            expect(output).toEqual(result);
        });
    });

    describe('getRandomCard', () => {
        test('throws an error if one occurred while retrieving a random card', async () => {
            SearchRepository.getRandomCard.mockImplementation(() => {
                throw new Error();
            });

            await expect(() => SearchService.getRandomCard()).rejects.toThrow();
        });

        test('returns a random card', async () => {
            const result = [
                {
                    card_id: 123,
                    cmc: 5.0,
                    name: 'test name',
                    set_name: 'test set name',
                    set_code: 'test',
                    faces_json: '{}',
                    layout: 'test_layout',
                    sets_json: '{}',
                },
            ];

            SearchRepository.getRandomCard.mockResolvedValue([result]);

            const output = await SearchService.getRandomCard();

            expect(output).toEqual(result[0]);
        });
    });

    describe('getCardTypes', () => {
        test('throws an error if one occurred while retrieving the card types', async () => {
            SearchRepository.getCardTypes.mockImplementation(() => {
                throw new Error();
            });

            await expect(() => SearchService.getCardTypes()).rejects.toThrow();
        });

        test('returns the list of card types', async () => {
            const result = [
                {
                    id: 123,
                    type: 'test type 1',
                },
                {
                    id: 456,
                    type: 'test type 2',
                },
            ];

            SearchRepository.getCardTypes.mockResolvedValue([result]);

            const output = await SearchService.getCardTypes();

            expect(output).toEqual({ card_types: result });
        });
    });

    describe('getCardSets', () => {
        test('throws an error if one occurred while retrieving the card sets', async () => {
            SearchRepository.getCardSets.mockImplementation(() => {
                throw new Error();
            });

            await expect(() => SearchService.getCardSets()).rejects.toThrow();
        });

        test('returns the list of card sets', async () => {
            const result = [
                {
                    id: 321,
                    type: 'test set 1',
                },
                {
                    id: 654,
                    type: 'test set 2',
                },
            ];

            SearchRepository.getCardSets.mockResolvedValue([result]);

            const output = await SearchService.getCardSets();

            expect(output).toEqual({ card_sets: result });
        });
    });
});
