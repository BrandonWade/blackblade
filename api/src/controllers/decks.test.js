import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import { requestMock, responseMock } from '../helpers/testing';
import DeckService from '../services/decks';
import {
    createDeck,
    saveDeck,
    getDeck,
    listDecks,
    deleteDeck,
    exportDeck,
    downloadDeck,
} from './decks';

jest.mock('../services/decks');

describe('Deck Controller', () => {
    describe('createDeck', () => {
        test('returns an error if one occurred while creating a deck', async () => {
            const body = {
                name: 'test name',
                visibility: 'private',
                notes: 'test notes',
                deck: [],
                maybeboard: [],
                last_updated_at: '2022-01-01T00:00:00.000Z',
                overwrite: false,
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
                deck: [],
                maybeboard: [],
                last_updated_at: '2022-01-01T00:00:00.000Z',
                overwrite: false,
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
        test('returns an unauthorized error if one occurred while saving the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const body = {
                name: 'test name',
                visibility: 'private',
                notes: 'test notes',
                deck: [],
                maybeboard: [],
                last_updated_at: '2022-01-01T00:00:00.000Z',
                overwrite: false,
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

        test('returns an error if one occurred while saving the deck', async () => {
            const body = {
                name: 'test name',
                visibility: 'private',
                notes: 'test notes',
                deck: [],
                maybeboard: [],
                last_updated_at: '2022-01-01T00:00:00.000Z',
                overwrite: false,
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
                deck: [],
                maybeboard: [],
                last_updated_at: '2022-01-01T00:00:00.000Z',
                overwrite: false,
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            const result = {
                deck_public_id: 'abcdef1234567890',
                account_public_id: '1234567890abcdef',
                name: 'test name',
                visibility: 'public',
                notes: 'test notes',
                cards: [],
            };

            DeckService.saveDeck.mockResolvedValue(result);

            await saveDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });

    describe('getDeck', () => {
        test('returns a not found error if one occurred while getting the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.getDeck.mockImplementation(() => {
                throw new NotFoundError();
            });

            await getDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.send).toHaveBeenCalled();
        });

        test('returns a not found error if an unauthorized error occurred while getting the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.getDeck.mockImplementation(() => {
                throw new UnauthorizedError();
            });

            await getDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.send).toHaveBeenCalled();
        });

        test('returns an error if one occurred while getting a deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.getDeck.mockImplementation(() => {
                throw new Error();
            });

            await getDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while retrieving this deck.',
                },
            });
        });

        test('returns the deck information if the deck was found successfully', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            const result = {
                deck_public_id: 'abcdef1234567890',
                account_public_id: '1234567890abcdef',
                name: 'test name',
                visibility: 'public',
                notes: 'test notes',
                cards: [],
            };
            DeckService.getDeck.mockResolvedValue(result);

            await getDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });

    describe('listDecks', () => {
        test('returns an error if one occurred while retrieving the deck list', async () => {
            const session = {
                accountID: 1,
            };
            const req = requestMock({ session });
            const res = responseMock();
            DeckService.listDecks.mockImplementation(() => {
                throw new Error();
            });

            await listDecks(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while retrieving your deck list.',
                },
            });
        });

        test('returns the list of decks if it was found successfully', async () => {
            const session = {
                accountID: 1,
            };
            const req = requestMock({ session });
            const res = responseMock();
            const result = {
                public_id: 'abcdef1234567890',
                name: 'test deck',
                deck_size: '60',
                maybeboard_size: '15',
                color: '{W}{U}{B}{G}{R}',
            };
            DeckService.listDecks.mockResolvedValue(result);

            await listDecks(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });

    describe('deleteDeck', () => {
        test('returns an unauthorized error if one occurred while deleting the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.deleteDeck.mockImplementation(() => {
                throw new UnauthorizedError();
            });

            await deleteDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'You do not have permission to delete this deck. If this deck is yours, please log in and try again.',
                },
            });
        });

        test('returns a not found error if one occurred while deleting the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.deleteDeck.mockImplementation(() => {
                throw new NotFoundError();
            });

            await deleteDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'This deck could not be deleted (it may have been deleted already).',
                },
            });
        });

        test('returns nothing if the deck was deleted successfully', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();

            DeckService.deleteDeck.mockResolvedValue();

            await deleteDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('exportDeck', () => {
        test('returns an unauthorized error if one occurred while exporting the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.exportDeck.mockImplementation(() => {
                throw new UnauthorizedError();
            });

            await exportDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: "You do not have permission to export this deck. If this deck is yours, please log in and try again or set it's visibility to 'public'.",
                },
            });
        });

        test('returns a not found error if one occurred while exporting the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.exportDeck.mockImplementation(() => {
                throw new NotFoundError();
            });

            await exportDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'This deck could not be exported (it may have been deleted already).',
                },
            });
        });

        test('returns an error if one occurred while exporting the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.exportDeck.mockImplementation(() => {
                throw new Error();
            });

            await exportDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while exporting this deck.',
                },
            });
        });

        test('returns the deck export if it was retrieved successfully', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            const result = ['1 Test Card', '2 Test Cards'];
            DeckService.exportDeck.mockResolvedValue(result);

            await exportDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith({
                deck_export: result,
            });
        });
    });

    describe('downloadDeck', () => {
        test('returns an unauthorized error if one occurred while downloading the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.exportDeck.mockImplementation(() => {
                throw new UnauthorizedError();
            });

            await downloadDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: "You do not have permission to download this deck. If this deck is yours, please log in and try again or set it's visibility to 'public'.",
                },
            });
        });

        test('returns a not found error if one occurred while downloading the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.exportDeck.mockImplementation(() => {
                throw new NotFoundError();
            });

            await downloadDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'This deck could not be downloaded (it may have been deleted already).',
                },
            });
        });

        test('returns an error if one occurred while downloading the deck', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            DeckService.exportDeck.mockImplementation(() => {
                throw new Error();
            });

            await downloadDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while downloading this deck.',
                },
            });
        });

        test('returns the deck download if it was retrieved successfully', async () => {
            const params = {
                publicID: 'abcdef1234567890',
            };
            const session = {
                accountID: 1,
            };
            const req = requestMock({ params, session });
            const res = responseMock();
            const result = ['1 Test Card', '2 Test Cards'];
            DeckService.exportDeck.mockResolvedValue(result);

            await downloadDeck(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.send).toHaveBeenCalledWith(result);
        });
    });
});
