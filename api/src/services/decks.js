import DeckRepository from '../repositories/decks';

const createDeck = async (accountID, name) => {
    let publicID;

    try {
        const [createResult] = await DeckRepository.createDeck(accountID, name);
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

const saveDeck = async (accountID, publicID, name, deck) => {
    try {
        const [deckIDResult] = await DeckRepository.getDeckByPublicID(publicID);
        const deckID = deckIDResult?.[0]?.id || 0;
        if (!deckID) {
            throw `error getting deck with public id ${publicID}`;
        }

        const saveResult = await DeckRepository.saveDeck(
            accountID,
            deckID,
            name,
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

const getDeck = async (publicID) => {
    let name;
    let cards;

    try {
        const [deck] = await DeckRepository.getDeckByPublicID(publicID);
        name = deck?.[0]?.name || '';
        if (!name.length) {
            throw `error getting name for deck with public id ${publicID}`;
        }

        [cards] = await DeckRepository.getDeckCardsByPublicID(publicID);
    } catch (e) {
        console.error('error retriving deck', e);
        throw e;
    }

    return {
        name,
        cards,
    };
};

export default {
    createDeck,
    saveDeck,
    getDeck,
};
