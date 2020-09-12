import DeckRepository from '../repositories/decks';

const createDeck = async (accountID, name) => {
    const [createResult] = await DeckRepository.createDeck(accountID, name);
    const deckID = createResult.insertId || 0;
    if (!deckID) {
        console.error('create deck: error creating deck'); // TODO: Handle
        return;
    }

    const [deckResult] = await DeckRepository.getPublicIDByID(deckID);
    const deckPublicID = deckResult?.[0].public_id || 0;
    if (!deckPublicID) {
        console.error('create deck: error getting public id'); // TODO: Handle
        return;
    }

    return {
        deck_uri: `/decks/${deckPublicID}`,
    };
};

const saveDeck = async (publicID, deck) => {
    const [deckIDResult] = await DeckRepository.getDeckByPublicID(publicID);
    const deckID = deckIDResult?.[0].id || 0;
    if (!deckID) {
        console.error('save deck: error getting deck id'); // TODO: Handle
        return;
    }

    const saveResult = await DeckRepository.saveDeck(deckID, deck);
    if (!saveResult) {
        console.error('save deck: error saving deck'); // TODO: Handle
        return;
    }

    return;
};

const getDeck = async (publicID) => {
    const [deck] = await DeckRepository.getDeckByPublicID(publicID);
    const [cards] = await DeckRepository.getDeckCardsByPublicID(publicID);

    return {
        name: deck?.[0].name || '',
        cards,
    };
};

export default {
    createDeck,
    saveDeck,
    getDeck,
};
