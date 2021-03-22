import DeckRepository from '../repositories/decks';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';

const createDeck = async (accountID, name, visibility) => {
    let publicID;

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

        const [deckResult] = await DeckRepository.getPublicIDByID(deckID);
        publicID = deckResult?.[0]?.public_id || 0;
        if (!publicID) {
            throw `error getting public id for deck ${deckID}`;
        }
    } catch (e) {
        console.error('error creating deck', e);
        throw e;
    }

    return {
        deck_uri: `/decks/${publicID}`,
    };
};

const saveDeck = async (accountID, publicID, name, visibility, deck) => {
    try {
        const [deckIDResult] = await DeckRepository.getDeckByPublicID(
            publicID,
            accountID,
        );
        const deckID = deckIDResult?.[0]?.id || 0;
        if (!deckID) {
            throw `error getting deck with public id ${publicID}`;
        }

        const deckAccountID = deckIDResult?.[0]?.account_id || 0;
        if (!deckAccountID || deckAccountID !== accountID) {
            throw new UnauthorizedError(
                'account id and deck account id do not match',
            );
        }

        const saveResult = await DeckRepository.saveDeck(
            accountID,
            deckID,
            name,
            visibility,
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
        [deck] = await DeckRepository.getDeckByPublicID(publicID, accountID);
        if (deck.length !== 1) {
            throw new NotFoundError(
                `error getting deck with public id ${publicID} and account id ${accountID}`,
            );
        }

        [cards] = await DeckRepository.getDeckCardsByPublicID(publicID);
    } catch (e) {
        console.error('error retriving deck', e);
        throw e;
    }

    return {
        account_public_id: deck?.[0]?.account_public_id,
        name: deck?.[0]?.name,
        visibility: deck?.[0]?.visibility,
        cards,
    };
};

export default {
    createDeck,
    saveDeck,
    getDeck,
};
