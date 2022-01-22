import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import { requestMock, responseMock } from '../testing/helpers';
import SearchService from '../services/search';
import {
    searchCards,
    getCardByID,
    getRandomCard,
    getCardTypes,
    getCardSets,
} from './search';

jest.mock('../services/search');

describe('Search Controller', () => {
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

    describe('getCardByID', () => {
        test('returns a not found error if the card with the given ID was not found', async () => {
            const params = {
                id: '12345',
            };
            const req = requestMock({ params });
            const res = responseMock();
            SearchService.getCardByID.mockImplementation(() => {
                throw new NotFoundError();
            });

            await getCardByID(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.send).toHaveBeenCalled();
        });

        test('returns an error if one occurred while searching for the card with the given ID', async () => {
            const params = {
                id: '12345',
            };
            const req = requestMock({ params });
            const res = responseMock();
            SearchService.getCardByID.mockImplementation(() => {
                throw new Error();
            });

            await getCardByID(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while searching for this card.',
                },
            });
        });

        test('returns the card with the given ID', async () => {
            const params = {
                id: '12345',
            };
            const req = requestMock({ params });
            const res = responseMock();
            const result = {
                id: 12345,
                layout: 'private',
                name: 'test name',
                set_name: 'test set',
                set_code: 'test',
                faces_json: {},
                sets_json: {},
                rulings_json: {},
            };
            SearchService.getCardByID.mockResolvedValue(result);

            await getCardByID(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });

    describe('getRandomCard', () => {
        test('returns an error if one occurred while retrieving a random card', async () => {
            const req = requestMock({});
            const res = responseMock();
            SearchService.getRandomCard.mockImplementation(() => {
                throw new Error();
            });

            await getRandomCard(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while retrieving a random card.',
                },
            });
        });

        test('returns a random card', async () => {
            const req = requestMock({});
            const res = responseMock();
            const result = {
                id: 12345,
                layout: 'private',
                name: 'test name',
                set_name: 'test set',
                set_code: 'test',
                faces_json: {},
                sets_json: {},
                rulings_json: {},
            };
            SearchService.getRandomCard.mockResolvedValue(result);

            await getRandomCard(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });

    describe('getCardTypes', () => {
        test('returns an error if one occurred while retrieving the list of types', async () => {
            const req = requestMock({});
            const res = responseMock();
            SearchService.getCardTypes.mockImplementation(() => {
                throw new Error();
            });

            await getCardTypes(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while retrieving available card types.',
                },
            });
        });

        test('returns the list of types', async () => {
            const req = requestMock({});
            const res = responseMock();
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
            SearchService.getCardTypes.mockResolvedValue(result);

            await getCardTypes(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });

    describe('getCardSets', () => {
        test('returns an error if one occurred while retrieving the list of sets', async () => {
            const req = requestMock({});
            const res = responseMock();
            SearchService.getCardSets.mockImplementation(() => {
                throw new Error();
            });

            await getCardSets(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while retrieving available card sets.',
                },
            });
        });

        test('returns the list of sets', async () => {
            const req = requestMock({});
            const res = responseMock();
            const result = [
                {
                    id: 123,
                    set_code: 'test1',
                    set_name: 'test set 1',
                },
                {
                    id: 456,
                    set_code: 'test2',
                    set_name: 'test set 2',
                },
            ];
            SearchService.getCardSets.mockResolvedValue(result);

            await getCardSets(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });
});
