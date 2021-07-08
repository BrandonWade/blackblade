import express from 'express';
import validate from '../middleware/validate';
import authenticate from '../middleware/authenticate';
import { createDeckValidators, saveDeckValidators } from '../validators/decks';
import {
    createDeck,
    saveDeck,
    getDeck,
    listDecks,
    deleteDeck,
    exportDeck,
    downloadDeck,
} from '../controllers/decks';

const decks = express.Router();

decks.post(
    '/',
    createDeckValidators,
    validate(),
    authenticate(
        'You must be logged in to create a deck. Please log in and try again.',
    ),
    createDeck,
);
decks.put(
    '/:publicID',
    saveDeckValidators,
    validate(),
    authenticate(
        'You do not have permission to modify this deck. If this deck is yours, please log in and try again.',
    ),
    saveDeck,
);
decks.get(
    '/',
    authenticate(
        'You must be logged in to view your decks. Please log in and try again.',
    ),
    listDecks,
);
decks.get('/:publicID', getDeck);
decks.delete('/:publicID', deleteDeck);
decks.get('/:publicID/export', exportDeck);
decks.get('/:publicID/download', downloadDeck);

export default decks;
