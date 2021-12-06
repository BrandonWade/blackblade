import { EOL } from 'os';
import DeckService from './decks';
import DeckRepository from '../repositories/decks';
import UnauthorizedError from '../errors/unauthorized';
import NewerVersionError from '../errors/newer_version';
import NotFoundError from '../errors/not_found';
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
            DeckRepository.getPublicIDsByID.mockResolvedValue([
                publicIDsResult,
            ]);

            await expect(() =>
                DeckService.createDeck(accountID, name, visibility, notes),
            ).rejects.toThrow();
        });

        test('returns the account public id and the newly created deck public id', async () => {
            const accountID = 12345;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const deckPublicID = 9999;
            const accountPublicID = 8888;
            const createResult = [
                {
                    insertId: 987,
                },
            ];
            const publicIDsResult = [
                {
                    deck_public_id: deckPublicID,
                    account_public_id: accountPublicID,
                },
            ];

            DeckRepository.createDeck.mockResolvedValue(createResult);
            DeckRepository.getPublicIDsByID.mockResolvedValue([
                publicIDsResult,
            ]);

            const output = await DeckService.createDeck(
                accountID,
                name,
                visibility,
                notes,
            );

            expect(output.deck_public_id).toBe(deckPublicID);
            expect(output.account_public_id).toBe(accountPublicID);
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
                        last_updated_at: '2021-01-01T00:00:00.000Z',
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
            ).rejects.toThrow();
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
                        last_updated_at: '2021-01-01T00:00:00.000Z',
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
            ).rejects.toThrow();
        });

        test('returns nothing if the deck was successfully overwritten', async () => {
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
            const overwrite = true;
            const deckIDResult = [
                [
                    {
                        id: 444,
                        account_id: 123,
                        last_updated_at: '2021-01-01T00:00:00.000Z',
                    },
                ],
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue(deckIDResult);
            getColorString.mockResolvedValue('{W}{U}{B}{R}{G}');
            DeckRepository.saveDeck.mockResolvedValue({});

            const output = await DeckService.saveDeck(
                accountID,
                publicID,
                name,
                visibility,
                notes,
                deck,
                maybeboard,
                lastUpdatedAt,
                overwrite,
            );

            expect(output).toBe();
        });

        test('returns nothing if the deck was successfully saved', async () => {
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
                        last_updated_at: '2021-01-01T00:00:00.000Z',
                    },
                ],
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue(deckIDResult);
            getColorString.mockResolvedValue('{W}{U}{B}{R}{G}');
            DeckRepository.saveDeck.mockResolvedValue({});

            const output = await DeckService.saveDeck(
                accountID,
                publicID,
                name,
                visibility,
                notes,
                deck,
                maybeboard,
                lastUpdatedAt,
                overwrite,
            );

            expect(output).toBe();
        });
    });

    describe('getDeck', () => {
        test('throws an error if one occurred while retrieving the deck with the given public id', async () => {
            const accountID = 456;
            const publicID = 1234567890;

            DeckRepository.getDeckByPublicID.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.getDeck(publicID, accountID),
            ).rejects.toThrow();
        });

        test('throws a not found error if exactly one deck was not retrieved with the given public id', async () => {
            const accountID = 456;
            const publicID = 1234567890;
            const deckResult = [];

            DeckRepository.getDeckByPublicID.mockResolvedValue([deckResult]);

            await expect(() =>
                DeckService.getDeck(publicID, accountID),
            ).rejects.toThrow(NotFoundError);
        });

        test('throws an error if one occurred while retrieving the cards from the deck with the given public id', async () => {
            const accountID = 456;
            const publicID = 1234567890;
            const deckResult = [
                {
                    account_public_id: 456,
                    id: 123,
                    public_id: publicID,
                    account_id: 678,
                    name: 'test name',
                    visibility: 'private',
                    notes: 'test notes 123',
                    deck_size: 0,
                    maybeboard_size: 0,
                    colors: '',
                    last_updated_at: '2021-01-01T00:00:00.000Z',
                },
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue([deckResult]);

            await expect(() =>
                DeckService.getDeck(publicID, accountID),
            ).rejects.toThrow(UnauthorizedError);
        });

        test('throws an unauthorized error if the user does not have permission to view the deck with the given public id', async () => {
            const accountID = 456;
            const publicID = 1234567890;
            const deckResult = [
                {
                    account_public_id: 456,
                    id: 123,
                    public_id: publicID,
                    account_id: accountID,
                    name: 'test name',
                    visibility: 'private',
                    notes: 'test notes 123',
                    deck_size: 0,
                    maybeboard_size: 0,
                    colors: '',
                    last_updated_at: '2021-01-01T00:00:00.000Z',
                },
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue([deckResult]);
            DeckRepository.getDeckCardsByPublicID.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.getDeck(publicID, accountID),
            ).rejects.toThrow();
        });

        test('returns the deck with the given public id', async () => {
            const accountID = 456;
            const publicID = 1234567890;
            const accountPublicID = 456;
            const name = 'test name';
            const visibility = 'private';
            const notes = 'test notes 123';
            const lastUpdatedAt = '2021-01-01T00:00:00.000Z';
            const deckResult = [
                {
                    account_public_id: accountPublicID,
                    id: 123,
                    public_id: publicID,
                    account_id: accountID,
                    name,
                    visibility,
                    notes,
                    deck_size: 0,
                    maybeboard_size: 0,
                    colors: '',
                    last_updated_at: lastUpdatedAt,
                },
            ];
            const cardsResult = [
                {
                    card_id: 789,
                    count: 2,
                    selection_type: 'automatic',
                    location: 'deck',
                    name: 'test card',
                    set_name: 'test set 1',
                    set_code: 'code1',
                    cmc: 2.0,
                    collector_number: 321,
                    faces_json: '{}',
                    layout: 'normal',
                    sets_json: '{}',
                },
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue([deckResult]);
            DeckRepository.getDeckCardsByPublicID.mockResolvedValue([
                cardsResult,
            ]);

            const output = await DeckService.getDeck(publicID, accountID);

            expect(output.deck_public_id).toBe(publicID);
            expect(output.account_public_id).toBe(accountPublicID);
            expect(output.name).toBe(name);
            expect(output.visibility).toBe(visibility);
            expect(output.notes).toBe(notes);
            expect(output.cards).toEqual(cardsResult);
            expect(output.last_updated_at).toBe(lastUpdatedAt);
        });
    });

    describe('listDecks', () => {
        test('throws an error if one occurred while retrieving the list of decks with the given account id', async () => {
            const accountID = 456;

            DeckRepository.listDecks.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.listDecks(accountID),
            ).rejects.toThrow();
        });

        test('returns the list of decks with the given account id', async () => {
            const accountID = 456;
            const decks = [
                {
                    public_id: 1234567890,
                    name: 'test deck',
                    deck_size: 10,
                    maybeboard_size: 5,
                    colors: '{C}',
                },
            ];

            DeckRepository.listDecks.mockResolvedValue([decks]);

            const output = await DeckService.listDecks(accountID);

            expect(output.decks).toEqual(decks);
        });
    });

    describe('deleteDeck', () => {
        test('throws an error if one occurred while deleting the deck with the given public id', async () => {
            const publicID = 123;

            DeckRepository.deleteDeckByPublicID.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.deleteDeck(publicID),
            ).rejects.toThrow();
        });

        test('returns nothing if the deck was successfully deleted', async () => {
            const publicID = 123;

            DeckRepository.deleteDeckByPublicID.mockResolvedValue();

            const output = await DeckService.deleteDeck(publicID);

            expect(output).toEqual();
        });
    });

    describe('exportDeck', () => {
        test('throws an error if one occurred while retrieving the deck with the given public id', async () => {
            const publicID = 123;
            const accountID = 456;

            DeckRepository.getDeckByPublicID.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.exportDeck(publicID, accountID),
            ).rejects.toThrow();
        });

        test('throws a not found error if there is not exactly one deck found with the given public id', async () => {
            const publicID = 123;
            const accountID = 456;
            const deckResult = [];

            DeckRepository.getDeckByPublicID.mockResolvedValue([deckResult]);

            await expect(() =>
                DeckService.exportDeck(publicID, accountID),
            ).rejects.toThrow(NotFoundError);
        });

        test('throws an unauthorized error if the user does not have permission to export the deck with the given public id', async () => {
            const publicID = 123;
            const accountID = 456;
            const deckResult = [
                {
                    account_public_id: 456,
                    id: 123,
                    public_id: publicID,
                    account_id: 678,
                    name: 'test name',
                    visibility: 'private',
                    notes: 'test notes 123',
                    deck_size: 0,
                    maybeboard_size: 0,
                    colors: '',
                    last_updated_at: '2021-01-01T00:00:00.000Z',
                },
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue([deckResult]);

            await expect(() =>
                DeckService.exportDeck(publicID, accountID),
            ).rejects.toThrow(UnauthorizedError);
        });

        test('throws an error if one occurred while attempting to retrieve the data needed to export the deck with the given public id', async () => {
            const publicID = 123;
            const accountID = 456;
            const deckResult = [
                {
                    account_public_id: 456,
                    id: 123,
                    public_id: publicID,
                    account_id: accountID,
                    name: 'test name',
                    visibility: 'private',
                    notes: 'test notes 123',
                    deck_size: 0,
                    maybeboard_size: 0,
                    colors: '',
                    last_updated_at: '2021-01-01T00:00:00.000Z',
                },
            ];

            DeckRepository.getDeckByPublicID.mockResolvedValue([deckResult]);
            DeckRepository.exportDeckByPublicID.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                DeckService.exportDeck(publicID, accountID),
            ).rejects.toThrow();
        });

        test('returns the export for the deck with the given public id', async () => {
            const publicID = 123;
            const accountID = 456;
            const deckResult = [
                {
                    account_public_id: 456,
                    id: 123,
                    public_id: publicID,
                    account_id: accountID,
                    name: 'test name',
                    visibility: 'private',
                    notes: 'test notes 123',
                    deck_size: 0,
                    maybeboard_size: 0,
                    colors: '',
                    last_updated_at: '2021-01-01T00:00:00.000Z',
                },
            ];
            const exportResult = [
                {
                    count: 2,
                    name: 'test name',
                    set_code: 'test1',
                    collector_number: 12345,
                    selection_type: 'automatic',
                },
                {
                    count: 4,
                    name: 'test name 2',
                    set_code: 'test2',
                    collector_number: 54321,
                    selection_type: 'manual',
                },
            ];
            const expected =
                '2 test name' + EOL + '4 test name 2 [TEST2] 54321';

            DeckRepository.getDeckByPublicID.mockResolvedValue([deckResult]);
            DeckRepository.exportDeckByPublicID.mockResolvedValue([
                exportResult,
            ]);

            const output = await DeckService.exportDeck(publicID, accountID);

            expect(output).toEqual(expected);
        });
    });
});
