import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import CardService from '../services/cards';
import { errorMessage } from '../helpers/messages';

const listCards = async (req, res) => {
    const { accountID } = req.session;
    let cards;

    try {
        cards = await CardService.listCards(accountID);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage(
                'An error occurred while retrieving your card list.',
            ),
        });
    }

    return res.status(StatusCodes.OK).json(cards);
};

const deleteCard = async (req, res) => {
    const { accountID } = req.session;
    const { cardID } = req.params;

    try {
        await CardService.deleteCard(cardID, accountID);
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: errorMessage(
                    'You do not have permission to delete this card. Please log in and try again.',
                ),
            });
        } else if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: errorMessage(
                    'This card could not be deleted (it may have been deleted already).',
                ),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occurred while deleting your card.',
                ),
            });
        }
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};

export { listCards, deleteCard };
