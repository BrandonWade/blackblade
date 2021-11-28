import DeckService from './decks';
import DeckRepository from '../repositories/decks';
import UnauthorizedError from '../errors/unauthorized';
import NewerVersionError from '../errors/newer_version';
import getColorString from '../helpers/colors';

jest.mock('../repositories/decks');
jest.mock('../helpers/colors');

describe('Deck Service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createDeck', () => {
        test('throws an error if one occurred while creating the deck', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';

            DeckRepository.createDeck.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });

        test('throws an error if the id for the newly created deck is not available', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const createResult = [];

            DeckRepository.createDeck.mockResolvedValue(createResult);

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });

        test('throws an error if one occurred while getting the public ids', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const createResult = [
                {
                    insertId: 987,
                },
            ];

            DeckRepository.createDeck.mockResolvedValue(createResult);
            DeckRepository.getPublicIDsByID.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });

        test('throws an error if the public ids for the newly created deck are not available', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const createResult = [
                {
                    insertId: 987,
                },
            ];
            const publicIDsResult = [];

            DeckRepository.createDeck.mockResolvedValue(createResult);
            DeckRepository.getPublicIDsByID.mockImplementation(publicIDsResult);

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });

        test('returns the account public id and the newly created deck public id', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const createResult = [
                {
                    insertId: 987,
                },
            ];
            const publicIDsResult = [
                {
                    deck_public_id: 3456,
                    account_public_id: 8765,
                },
            ];

            DeckRepository.createDeck.mockResolvedValue(createResult);
            DeckRepository.getPublicIDsByID.mockImplementation(publicIDsResult);

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });
    });

    describe('saveDeck', () => {
        test('throws an error if one occurred while retrieving the deck with the given public id', async () => {
            const accountID = 123;
            const publicID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const deck = [
                {
                    card_id: 111,
                    cmc: 2.0,
                    name: 'test name',
                    set_name: 'test set name',
                    set_code: 'test',
                    faces_json: '{}',
                    layout: 'test_layout',
                    sets_json: '{}',
                },
            ];
            const maybeboard = [
                {
                    card_id: 222,
                    cmc: 3.0,
                    name: 'test name 2',
                    set_name: 'test set name 2',
                    set_code: 'test2',
                    faces_json: '{}',
                    layout: 'test_layout_2',
                    sets_json: '{}',
                },
            ];
            const lastUpdatedAt = '2021-01-01T00:00:00.000Z';
            const overwrite = false;

            DeckRepository.getDeckByPublicID.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.saveDeck(
                    accountID,
                    publicID,
                    name,
                    visibility,
                    notes,
                    deck,
                    maybeboard,
                    lastUpdatedAt,
                    overwrite,
                ),
            ).rejects.toThrow();
        });

        test('throws an error if the deck with the given public id could not be found', async () => {
            const accountID = 123;
            const publicID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const deck = [
                {
                    card_id: 111,
                    cmc: 2.0,
                    name: 'test name',
                    set_name: 'test set name',
                    set_code: 'test',
                    faces_json: '{}',
                    layout: 'test_layout',
                    sets_json: '{}',
                },
            ];
            const maybeboard = [
                {
                    card_id: 222,
                    cmc: 3.0,
                    name: 'test name 2',
                    set_name: 'test set name 2',
                    set_code: 'test2',
                    faces_json: '{}',
                    layout: 'test_layout_2',
                    sets_json: '{}',
                },
            ];
            const lastUpdatedAt = '2021-01-01T00:00:00.000Z';
            const overwrite = false;
            const deckIDResult = [{}];

            DeckRepository.getDeckByPublicID.mockResolvedValue(deckIDResult);

            await expect(() =>
                DeckService.saveDeck(
                    accountID,
                    publicID,
                    name,
                    visibility,
                    notes,
                    deck,
                    maybeboard,
                    lastUpdatedAt,
                    overwrite,
                ),
            ).rejects.toThrow();
        });

        test('throws an error if the deck account id does not match given account id', async () => {
            const accountID = 123;
            const publicID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const deck = [
                {
                    card_id: 111,
                    cmc: 2.0,
                    name: 'test name',
                    set_name: 'test set name',
                    set_code: 'test',
                    faces_json: '{}',
                    layout: 'test_layout',
                    sets_json: '{}',
                },
            ];
            const maybeboard = [
                {
                    card_id: 222,
                    cmc: 3.0,
                    name: 'test name 2',
                    set_name: 'test set name 2',
                    set_code: 'test2',
                    faces_json: '{}',
                    layout: 'test_layout_2',
                    sets_json: '{}',
                },
            ];
            const lastUpdatedAt = '2021-01-01T00:00:00.000Z';
            const overwrite = false;
            const deckIDResult = [
                [
                    {
                        id: 444,
                        account_id: 555,
                        last_updated_at: '2021-01-01T00:00:00.000Z',
                    },
                ],
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue(deckIDResult);

            await expect(() =>
                DeckService.saveDeck(
                    accountID,
                    publicID,
                    name,
                    visibility,
                    notes,
                    deck,
                    maybeboard,
                    lastUpdatedAt,
                    overwrite,
                ),
            ).rejects.toThrow(UnauthorizedError);
        });

        test('throws an error if an edit conflict occurs with the given deck', async () => {
            const accountID = 123;
            const publicID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const deck = [
                {
                    card_id: 111,
                    cmc: 2.0,
                    name: 'test name',
                    set_name: 'test set name',
                    set_code: 'test',
                    faces_json: '{}',
                    layout: 'test_layout',
                    sets_json: '{}',
                },
            ];
            const maybeboard = [
                {
                    card_id: 222,
                    cmc: 3.0,
                    name: 'test name 2',
                    set_name: 'test set name 2',
                    set_code: 'test2',
                    faces_json: '{}',
                    layout: 'test_layout_2',
                    sets_json: '{}',
                },
            ];
            const lastUpdatedAt = '2021-01-01T00:00:00.000Z';
            const overwrite = false;
            const deckIDResult = [
                [
                    {
                        id: 444,
                        account_id: 123,
                        last_updated_at: '2021-01-02T00:00:00.000Z',
                    },
                ],
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue(deckIDResult);

            await expect(() =>
                DeckService.saveDeck(
                    accountID,
                    publicID,
                    name,
                    visibility,
                    notes,
                    deck,
                    maybeboard,
                    lastUpdatedAt,
                    overwrite,
                ),
            ).rejects.toThrow(NewerVersionError);
        });

        test('throws an error if one occurred while saving the deck', async () => {
            const accountID = 123;
            const publicID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const deck = [
                {
                    card_id: 111,
                    cmc: 2.0,
                    name: 'test name',
                    set_name: 'test set name',
                    set_code: 'test',
                    faces_json: '{}',
                    layout: 'test_layout',
                    sets_json: '{}',
                },
            ];
            const maybeboard = [
                {
                    card_id: 222,
                    cmc: 3.0,
                    name: 'test name 2',
                    set_name: 'test set name 2',
                    set_code: 'test2',
                    faces_json: '{}',
                    layout: 'test_layout_2',
                    sets_json: '{}',
                },
            ];
            const lastUpdatedAt = '2021-01-01T00:00:00.000Z';
            const overwrite = false;
            const deckIDResult = [
                [
                    {
                        id: 444,
                        account_id: 123,
                        last_updated_at: '2021-01-02T00:00:00.000Z',
                    },
                ],
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue(deckIDResult);
            getColorString.mockResolvedValue('{W}{U}{B}{R}{G}');
            DeckRepository.saveDeck.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.saveDeck(
                    accountID,
                    publicID,
                    name,
                    visibility,
                    notes,
                    deck,
                    maybeboard,
                    lastUpdatedAt,
                    overwrite,
                ),
            ).rejects.toThrow(NewerVersionError);
        });

        test('throws an error if saving the deck was not successful', async () => {
            const accountID = 123;
            const publicID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const deck = [
                {
                    card_id: 111,
                    cmc: 2.0,
                    name: 'test name',
                    set_name: 'test set name',
                    set_code: 'test',
                    faces_json: '{}',
                    layout: 'test_layout',
                    sets_json: '{}',
                },
            ];
            const maybeboard = [
                {
                    card_id: 222,
                    cmc: 3.0,
                    name: 'test name 2',
                    set_name: 'test set name 2',
                    set_code: 'test2',
                    faces_json: '{}',
                    layout: 'test_layout_2',
                    sets_json: '{}',
                },
            ];
            const lastUpdatedAt = '2021-01-01T00:00:00.000Z';
            const overwrite = false;
            const deckIDResult = [
                [
                    {
                        id: 444,
                        account_id: 123,
                        last_updated_at: '2021-01-02T00:00:00.000Z',
                    },
                ],
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue(deckIDResult);
            getColorString.mockResolvedValue('{W}{U}{B}{R}{G}');
            DeckRepository.saveDeck.mockResolvedValue();

            await expect(() =>
                DeckService.saveDeck(
                    accountID,
                    publicID,
                    name,
                    visibility,
                    notes,
                    deck,
                    maybeboard,
                    lastUpdatedAt,
                    overwrite,
                ),
            ).rejects.toThrow(NewerVersionError);
        });
    });
});
