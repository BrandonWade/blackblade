import DeckRepository from '../repositories/decks';

const createDeck = async (accountID, name) => {
    const createResult = await DeckRepository.createDeck(accountID, name);
    const deckID = createResult?.results?.insertId;
    if (!deckID) {
        console.error('error creating deck'); // TODO: Handle
        return;
    }

    const deckResult = await DeckRepository.getDeckByID(deckID, accountID);
    const deckPublicID = deckResult?.results?.[0]?.public_id;
    if (!deckPublicID) {
        console.error('error getting deck id'); // TODO: Handle
        return;
    }

    return {
        deck_uri: `/decks/${deckPublicID}`,
    };
};

export default {
    createDeck,
};
