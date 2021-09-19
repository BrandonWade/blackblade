import { StatusCodes } from 'http-status-codes';
import UnauthorizedError from '../errors/unauthorized';
import { requestMock, responseMock } from '../helpers/testing';
import DeckService from '../services/decks';
import { createDeck, saveDeck } from './decks';

jest.mock('../services/decks');

describe('Deck Service', () => {
    describe('createDeck', () => {
        test('returns an error if one occurred while creating a deck', async () => {
            const body = {
                name: 'test name',
                visibility: 'private',
                notes: 'test notes',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            DeckService.createDeck.mockImplementation(() => {
                throw new Error();
            });

            await createDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while creating your deck.',
                },
            });
        });

        test('returns the deck information if the deck was created successfully', async () => {
            const body = {
                name: 'test name',
                visibility: 'private',
                notes: 'test notes',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            const result = {
                deck_public_id: 9999,
                account_public_id: 'abcdef1234567890',
            };
            DeckService.createDeck.mockResolvedValue(result);

            await createDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });

    describe('saveDeck', () => {
        test('returns an unauthorized error if one occurred while saving a deck', async () => {
            const params = {
                publicID: 1,
            };
            const body = {
                name: 'test name',
                visibility: 'private',
                notes: 'test notes',
                deck: [],
                maybeboard: [],
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, body, session });
            const res = responseMock();
            DeckService.saveDeck.mockImplementation(() => {
                throw new UnauthorizedError();
            });

            await saveDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'You do not have permission to modify this deck. If this deck is yours, please log in and try again.',
                },
            });
        });

        test('returns an error if one occurred while saving a deck', async () => {
            const body = {
                name: 'test name',
                visibility: 'private',
                notes: 'test notes',
                deck: [],
                maybeboard: [],
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            DeckService.saveDeck.mockImplementation(() => {
                throw new Error();
            });

            await saveDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while saving your deck.',
                },
            });
        });

        test('returns the deck information if the deck was saved successfully', async () => {
            const body = {
                name: 'test name',
                visibility: 'private',
                notes: 'test notes',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ body, session });
            const res = responseMock();

            DeckService.saveDeck.mockResolvedValue();

            await saveDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
