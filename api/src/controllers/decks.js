import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import DeckService from '../services/decks';
import { errorMessage } from '../helpers/messages';

const createDeck = async (req, res) => {
    const { accountID } = req.session;
    const { name = 'Untitled Deck', visibility = 'private' } = req.body;
    let result;

    try {
        result = await DeckService.createDeck(accountID, name, visibility);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage(
                'An error occurred while creating your deck.',
            ),
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
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: errorMessage(
                    'You do not have permission to modify this deck. If this deck is yours, please log in and try again.',
                ),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage('An error occurred saving your deck.'),
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
        if (e instanceof NotFoundError || e instanceof UnauthorizedError) {
            return res.status(StatusCodes.NOT_FOUND).send();
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occurred retrieving your deck.',
                ),
            });
        }
    }

    return res.status(StatusCodes.OK).json(deck);
};

const listDecks = async (req, res) => {
    const { accountID } = req.session;
    let deck;

    try {
        deck = await DeckService.listDecks(accountID);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage(
                'An error occurred retrieving your deck list.',
            ),
        });
    }

    return res.status(StatusCodes.OK).json(deck);
};

const deleteDeck = async (req, res) => {
    const { accountID } = req.session;
    const { publicID } = req.params;

    try {
        await DeckService.deleteDeck(publicID, accountID);
    } catch (e) {
        if (e instanceof NotFoundError || e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: errorMessage(
                    'You do not have permission to delete this deck. If this deck is yours, please log in and try again.',
                ),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage('An error occurred deleting your deck.'),
            });
        }
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};

export { createDeck, saveDeck, getDeck, listDecks, deleteDeck };
