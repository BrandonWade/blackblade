import * as HttpStatus from 'http-status-codes';
import DeckService from '../services/decks';

const createDeck = async (req, res) => {
    const accountID = 0; // TODO: Get from session
    const name = 'New Deck'; // TODO: Get from request

    const result = await DeckService.createDeck(accountID, name);
    if (!result.deck_uri) {
        console.error('error getting deck id'); // TODO: Handle
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        return;
    }

    res.status(HttpStatus.OK).json(result);
};

export { createDeck };
