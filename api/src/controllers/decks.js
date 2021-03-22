import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import DeckService from '../services/decks';

const createDeck = async (req, res) => {
    const { accountID } = req.session;
    const { name = 'Untitled Deck', visibility = 'private' } = req.body;
    let result;

    try {
        result = await DeckService.createDeck(accountID, name, visibility);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error creating new deck' }],
        });
    }

    return res.status(StatusCodes.OK).json(result);
};

const saveDeck = async (req, res) => {
    const { accountID } = req.session;
    const { publicID } = req.params;
    const { name = 'Untitled Deck', visibility = 'private', cards } = req.body;

    try {
        await DeckService.saveDeck(
            accountID,
            publicID,
            name,
            visibility,
            cards,
        );
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNAUTHORIZED).send();
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: [{ msg: 'error saving deck' }],
            });
        }
    }

    return res.status(StatusCodes.OK).send();
};

const getDeck = async (req, res) => {
    const { accountID } = req.session;
    const { publicID } = req.params;
    let deck;

    try {
        deck = await DeckService.getDeck(publicID, accountID);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).send();
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: [{ msg: 'error retrieving deck' }],
            });
        }
    }

    return res.status(StatusCodes.OK).json(deck);
};

export { createDeck, saveDeck, getDeck };
