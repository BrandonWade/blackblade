import { EOL } from 'os';
import { sumBy } from 'lodash';
import { compareAsc, parseISO } from 'date-fns';
import DeckRepository from '../repositories/decks';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import NewerVersionError from '../errors/newer_version';
import getColorString from '../helpers/colors';

const createDeck = async (accountID, name, visibility, notes) => {
    let deckPublicID;
    let accountPublicID;

    try {
        const [createResult] = await DeckRepository.createDeck(
            accountID,
            name,
            visibility,
            notes,
        );
        const deckID = createResult?.insertId || 0;
        if (!deckID) {
            throw 'error inserting new deck row';
        }

        const [publicIDsResult] = await DeckRepository.getPublicIDsByID(deckID);
        deckPublicID = publicIDsResult?.[0]?.deck_public_id || 0;
        accountPublicID = publicIDsResult?.[0]?.account_public_id || 0;
        if (!deckPublicID || !accountPublicID) {
            throw new Error(`error getting public ids for deck ${deckID}`);
        }
    } catch (e) {
        console.error('error creating deck', e);
        throw e;
    }

    return {
        deck_public_id: deckPublicID,
        account_public_id: accountPublicID,
    };
};

const saveDeck = async (
    accountID,
    publicID,
    name,
    visibility,
    notes,
    deck,
    maybeboard,
    lastUpdatedAt,
    overwrite,
) => {
    let updatedDeck;

    try {
        const [deckIDResult] = await DeckRepository.getDeckByPublicID(publicID);
        const deckID = deckIDResult?.[0]?.id || 0;
        const deckAccountID = deckIDResult?.[0]?.account_id || 0;
        if (!deckID || !deckAccountID) {
            throw new Error(`error getting deck with public id ${publicID}`);
        }

        if (deckAccountID !== accountID) {
            throw new UnauthorizedError(
                'account id and deck account id do not match',
            );
        }

        // Check this deck for edit conflicts
        if (!overwrite) {
            const deckLastUpdatedAt = deckIDResult[0].last_updated_at;

            // Compare last_updated_at from DB against provided last_updated_at
            if (compareAsc(deckLastUpdatedAt, parseISO(lastUpdatedAt)) === 1) {
                throw new NewerVersionError('db contains newer deck version');
            }
        }

        const deckSize = sumBy(deck, (c) => parseInt(c.count));
        const maybeboardSize = sumBy(maybeboard, (c) => parseInt(c.count));
        const cards = [...deck, ...maybeboard];
        const colors = getColorString(deck);

        const saveResult = await DeckRepository.saveDeck(
            accountID,
            deckID,
            name,
            visibility,
            notes,
            deckSize,
            maybeboardSize,
            colors,
            cards,
        );
        if (!saveResult) {
            throw new Error(`error saving deck with public id ${publicID}`);
        }

        // Now that it's been saved, return the updated deck info
        return getDeck(publicID, accountID);
    } catch (e) {
        console.error('error saving deck', e);
        throw e;
    }
};

const getDeck = async (publicID, accountID) => {
    let deck;
    let cards;

    try {
        [deck] = await DeckRepository.getDeckByPublicID(publicID);
        if (deck.length !== 1) {
            throw new NotFoundError(
                `error getting deck with public id ${publicID} and account id ${accountID}`,
            );
        }

        deck = deck[0];
        if (deck.visibility !== 'public' && deck.account_id !== accountID) {
            throw new UnauthorizedError(
                `user does not have permission to view deck ${publicID}`,
            );
        }

        [cards] = await DeckRepository.getDeckCardsByPublicID(publicID);
    } catch (e) {
        console.error('error getting deck', e);
        throw e;
    }

    return {
        deck_public_id: deck?.public_id,
        account_public_id: deck?.account_public_id,
        name: deck?.name,
        visibility: deck?.visibility,
        notes: deck?.notes,
        cards,
        last_updated_at: deck?.last_updated_at,
    };
};

const listDecks = async (accountID) => {
    let decks;

    try {
        [decks] = await DeckRepository.listDecks(accountID);
    } catch (e) {
        console.error('error listing decks', e);
        throw e;
    }

    return {
        decks,
    };
};

const deleteDeck = async (publicID, accountID) => {
    try {
        await DeckRepository.deleteDeckByPublicID(publicID, accountID);
    } catch (e) {
        console.error('error deleting deck', e);
        throw e;
    }

    return;
};

const exportDeck = async (publicID, accountID) => {
    let deckExport;

    const formatRow = (
        count,
        name,
        setCode,
        collectorNumber,
        selectionType,
    ) => {
        if (selectionType === 'automatic') {
            return `${count} ${name}`;
        } else {
            return `${count} ${name} [${setCode.toUpperCase()}] ${collectorNumber}`;
        }
    };

    try {
        let [deck] = await DeckRepository.getDeckByPublicID(publicID);
        if (deck.length !== 1) {
            throw new NotFoundError(`deck ${publicID} not found`);
        }

        deck = deck[0];
        if (deck.visibility !== 'public' && deck.account_id !== accountID) {
            throw new UnauthorizedError(
                `user does not have permission to export deck ${publicID}`,
            );
        }

        const [results] = await DeckRepository.exportDeckByPublicID(publicID);
        const rows = results.map((r) =>
            formatRow(
                r.count,
                r.name,
                r.set_code,
                r.collector_number,
                r.selection_type,
            ),
        );

        deckExport = rows.join(EOL);
    } catch (e) {
        console.error('error exporting deck', e);
        throw e;
    }

    return deckExport;
};

export default {
    createDeck,
    saveDeck,
    getDeck,
    listDecks,
    deleteDeck,
    exportDeck,
};
