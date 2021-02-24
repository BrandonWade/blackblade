import { StatusCodes } from 'http-status-codes';
import DeckService from '../services/decks';

const createDeck = async (req, res) => {
    const accountID = 0; // TODO: Get from session
    const name = req.body.name || 'Untitled Deck';
    let result;

    try {
        result = await DeckService.createDeck(accountID, name);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error creating new deck' }],
        });
    }

    return res.status(StatusCodes.OK).json(result);
};

const saveDeck = async (req, res) => {
    const publicID = req.params['publicID'];
    const name = req.body.name;
    const cards = req.body.cards;

    try {
        await DeckService.saveDeck(publicID, name, cards);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error saving deck' }],
        });
    }

    return res.status(StatusCodes.OK).send();
};

const getDeck = async (req, res) => {
    const publicID = req.params['publicID'];
    let cards;

    try {
        cards = await DeckService.getDeck(publicID);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error retrieving deck' }],
        });
    }

    return res.status(StatusCodes.OK).json(cards);
};

export { createDeck, saveDeck, getDeck };
