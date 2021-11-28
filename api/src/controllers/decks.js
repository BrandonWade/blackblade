import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import NewerVersionError from '../errors/newer_version';
import UnauthorizedError from '../errors/unauthorized';
import DeckService from '../services/decks';
import { errorMessage, warningMessage } from '../helpers/messages';

const createDeck = async (req, res) => {
    const { accountID } = req.session;
    const { name, visibility, notes } = req.body;
    let deck;

    try {
        deck = await DeckService.createDeck(accountID, name, visibility, notes);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage(
                'An error occurred while creating your deck.',
            ),
        });
    }

    return res.status(StatusCodes.CREATED).json(deck);
};

const saveDeck = async (req, res) => {
    const { accountID } = req.session;
    const { publicID } = req.params;
    const {
        name,
        visibility,
        notes,
        deck,
        maybeboard,
        lastUpdatedAt,
        overwrite,
    } = req.body;
    let updatedDeck;

    try {
        await DeckService.saveDeck(
            accountID,
            publicID,
            name,
            visibility,
            notes,
            deck,
            maybeboard,
            lastUpdatedAt,
            overwrite,
        );
        updatedDeck = await DeckService.getDeck(publicID, accountID);
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: errorMessage(
                    'You do not have permission to modify this deck. If this deck is yours, please log in and try again.',
                ),
            });
        } else if (e instanceof NewerVersionError) {
            return res.status(StatusCodes.CONFLICT).json({
                message: warningMessage(
                    'Your deck has not been saved; a newer version of this deck has already exists.',
                ),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occurred while saving your deck.',
                ),
            });
        }
    }

    return res.status(StatusCodes.OK).json(updatedDeck);
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
                    'An error occurred while retrieving this deck.',
                ),
            });
        }
    }

    return res.status(StatusCodes.OK).json(deck);
};

const listDecks = async (req, res) => {
    const { accountID } = req.session;
    let decks;

    try {
        decks = await DeckService.listDecks(accountID);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: errorMessage(
                'An error occurred while retrieving your deck list.',
            ),
        });
    }

    return res.status(StatusCodes.OK).json(decks);
};

const deleteDeck = async (req, res) => {
    const { accountID } = req.session;
    const { publicID } = req.params;

    try {
        await DeckService.deleteDeck(publicID, accountID);
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: errorMessage(
                    'You do not have permission to delete this deck. If this deck is yours, please log in and try again.',
                ),
            });
        } else if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: errorMessage(
                    'This deck could not be deleted (it may have been deleted already).',
                ),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occurred while deleting your deck.',
                ),
            });
        }
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};

const exportDeck = async (req, res) => {
    const { accountID } = req.session;
    const { publicID } = req.params;
    let deckExport;

    try {
        deckExport = await DeckService.exportDeck(publicID, accountID);
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: errorMessage(
                    "You do not have permission to export this deck. If this deck is yours, please log in and try again or set it's visibility to 'public'.",
                ),
            });
        } else if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: errorMessage(
                    'This deck could not be exported (it may have been deleted already).',
                ),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occurred while exporting this deck.',
                ),
            });
        }
    }

    return res.status(StatusCodes.OK).json({
        deck_export: deckExport,
    });
};

const downloadDeck = async (req, res) => {
    const { accountID } = req.session;
    const { publicID } = req.params;
    let deck;

    try {
        deck = await DeckService.exportDeck(publicID, accountID);
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: errorMessage(
                    "You do not have permission to download this deck. If this deck is yours, please log in and try again or set it's visibility to 'public'.",
                ),
            });
        } else if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: errorMessage(
                    'This deck could not be downloaded (it may have been deleted already).',
                ),
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occurred while downloading this deck.',
                ),
            });
        }
    }

    res.set('Content-Type', 'text/plain');
    res.set('Content-Disposition', `attachment; filename=${publicID}.txt`);

    return res.status(StatusCodes.OK).send(deck);
};

export {
    createDeck,
    saveDeck,
    getDeck,
    listDecks,
    deleteDeck,
    exportDeck,
    downloadDeck,
};
