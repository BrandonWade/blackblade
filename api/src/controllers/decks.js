import * as HttpStatus from 'http-status-codes';
import DeckService from '../services/decks';

const createDeck = async (req, res) => {
    const accountID = 0; // TODO: Get from session
    const name = req.body.name || 'Untitled Deck';

    const result = await DeckService.createDeck(accountID, name);
    if (!result.deck_uri) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            errors: { msg: 'error creating new deck' },
        });

        return;
    }

    res.status(HttpStatus.OK).json(result);
};

const saveDeck = async (req, res) => {
    const publicID = req.params['publicID'];
    const cards = req.body || [];

    await DeckService.saveDeck(publicID, cards);

    res.status(HttpStatus.OK).send();
};

const getDeck = async (req, res) => {
    const publicID = req.params['publicID'];
    const cards = await DeckService.getDeck(publicID);
    res.status(HttpStatus.OK).json(cards);
};

export { createDeck, saveDeck, getDeck };
