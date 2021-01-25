import DeckRepository from '../repositories/decks';

const createDeck = async (accountID, name) => {
    const [createResult] = await DeckRepository.createDeck(accountID, name);
    const deckID = createResult.insertId || 0;
    if (!deckID) {
        const err = 'create deck: error creating deck';
        console.error(err);
        throw err;
    }

    const [deckResult] = await DeckRepository.getPublicIDByID(deckID);
    const deckPublicID = deckResult?.[0].public_id || 0;
    if (!deckPublicID) {
        const err = 'create deck: error getting public id';
        console.error(err);
        throw err;
    }

    return {
        deck_uri: `/decks/${deckPublicID}`,
    };
};

const saveDeck = async (publicID, name, deck) => {
    const [deckIDResult] = await DeckRepository.getDeckByPublicID(publicID);
    const deckID = deckIDResult?.[0].id || 0;
    if (!deckID) {
        const err = 'save deck: error getting deck id';
        console.error(err);
        throw err;
    }

    const saveResult = await DeckRepository.saveDeck(deckID, name, deck);
    if (!saveResult) {
        const err = 'save deck: error saving deck';
        console.error(err);
        throw err;
    }

    return;
};

const getDeck = async (publicID) => {
    const [deck] = await DeckRepository.getDeckByPublicID(publicID);
    const [cards] = await DeckRepository.getDeckCardsByPublicID(publicID);

    return {
        name: deck?.[0]?.name || '',
        cards,
    };
};

export default {
    createDeck,
    saveDeck,
    getDeck,
};
