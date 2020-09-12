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

// TODO: Implement
const saveDeck = async (req, res) => {
    const publicID = req.params['publicID'];
    const cards = req.body || [];

    const result = await DeckService.saveDeck(publicID, cards);

    res.status(HttpStatus.OK).send();
};

const getDeck = async (req, res) => {
    const publicID = req.params['publicID'];
    const cards = await DeckService.getDeck(publicID);
    res.status(HttpStatus.OK).json(cards);
};

export { createDeck, saveDeck, getDeck };
