import SearchService from '../services/search';
import SearchRepository from '../repositories/search';

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
});
