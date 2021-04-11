import DeckRepository from '../repositories/decks';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';

const createDeck = async (accountID, name, visibility) => {
    let deckPublicID;
    let accountPublicID;

    try {
        const [createResult] = await DeckRepository.createDeck(
            accountID,
            name,
            visibility,
        );
        const deckID = createResult?.insertId || 0;
        if (!deckID) {
            throw 'error inserting new deck row';
        }

        const [publicIDsResult] = await DeckRepository.getPublicIDsByID(deckID);
        deckPublicID = publicIDsResult?.[0]?.deck_public_id || 0;
        accountPublicID = publicIDsResult?.[0]?.account_public_id || 0;
        if (!deckPublicID || !accountPublicID) {
            throw `error getting public ids for deck ${deckID}`;
        }
    } catch (e) {
        console.error('error creating deck', e);
        throw e;
    }

    return {
        deck_uri: `/decks/${deckPublicID}`,
        account_public_id: accountPublicID,
    };
};

const saveDeck = async (accountID, publicID, name, visibility, deck) => {
    try {
        const [deckIDResult] = await DeckRepository.getDeckByPublicID(publicID);
        const deckID = deckIDResult?.[0]?.id || 0;
        const deckAccountID = deckIDResult?.[0]?.account_id || 0;
        if (!deckID || !deckAccountID) {
            throw `error getting deck with public id ${publicID}`;
        }

        if (deckAccountID !== accountID) {
            throw new UnauthorizedError(
                'account id and deck account id do not match',
            );
        }

        const count = 0; // TODO: Calculate
        const colors = ''; // TODO: Calculate

        const saveResult = await DeckRepository.saveDeck(
            accountID,
            deckID,
            name,
            visibility,
            count,
            colors,
            deck,
        );
        if (!saveResult) {
            throw `error saving deck with public id ${publicID}`;
        }
    } catch (e) {
        console.error('error saving deck', e);
        throw e;
    }

    return;
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
        console.error('error retriving deck', e);
        throw e;
    }

    return {
        account_public_id: deck?.account_public_id,
        name: deck?.name,
        visibility: deck?.visibility,
        cards,
    };
};

const listDecks = async (accountID) => {
    let decks;

    try {
        [decks] = await DeckRepository.listDecksByAccountID(accountID);
    } catch (e) {
        console.error('error retriving deck', e);
        throw e;
    }

    return decks;
};

export default {
    createDeck,
    saveDeck,
    getDeck,
    listDecks,
};
