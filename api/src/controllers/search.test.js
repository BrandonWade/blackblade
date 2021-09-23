import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import { requestMock, responseMock } from '../helpers/testing';
import SearchService from '../services/search';
import {
    searchCards,
    getCardByID,
    getRandomCard,
    getCardTypes,
    getCardSets,
} from './search';

jest.mock('../services/search');

describe.only('Search Controller', () => {
    describe('searchCards', () => {
        test('returns an error if one occurred while searching for cards', async () => {
            const query = {
                name: 'foo',
            };
            const req = requestMock({ query });
            const res = responseMock();
            SearchService.searchCards.mockImplementation(() => {
                throw new Error();
            });

            await searchCards(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while performing your search.',
                },
            });
        });

        test('returns search results for the provided criteria', async () => {
            const query = {
                name: 'foo',
            };
            const req = requestMock({ query });
            const res = responseMock();
            const result = {
                total_results: 2,
                pages: 1,
                results: [
                    {
                        card_id: 999,
                        cmc: 4.0,
                        name: 'test name',
                        set_name: 'test set',
                        set_code: 'test',
                        faces_json: {},
                        layout: 'normal',
                        sets_json: {},
                    },
                    {
                        card_id: 888,
                        cmc: 1.0,
                        name: 'test name 2',
                        set_name: 'test set',
                        set_code: 'test',
                        faces_json: {},
                        layout: 'normal',
                        sets_json: {},
                    },
                ],
            };
            SearchService.searchCards.mockResolvedValue(result);

            await searchCards(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });
});
