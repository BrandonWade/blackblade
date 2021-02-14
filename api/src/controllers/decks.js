import { StatusCodes } from 'http-status-codes';
import DeckService from '../services/decks';

const createDeck = async (req, res) => {
    const accountID = 0; // TODO: Get from session
    const name = req.body.name || 'Untitled Deck';

    try {
        const result = await DeckService.createDeck(accountID, name);
        res.status(StatusCodes.OK).json(result);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error creating new deck' }],
        });
    }
};

const saveDeck = async (req, res) => {
    const publicID = req.params['publicID'];
    const name = req.body?.name || '';
    const cards = req.body?.cards || [];

    try {
        await DeckService.saveDeck(publicID, name, cards);
        res.status(StatusCodes.OK).send();
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error saving deck' }],
        });
    }
};

const getDeck = async (req, res) => {
    const publicID = req.params['publicID'];
    const cards = await DeckService.getDeck(publicID);
    res.status(StatusCodes.OK).json(cards);
};

export { createDeck, saveDeck, getDeck };
