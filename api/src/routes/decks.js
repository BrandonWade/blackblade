import express from 'express';
import validate from '../middleware/validate';
import authenticate from '../middleware/authenticate';
import { createDeckValidators, saveDeckValidators } from '../validators/deck';
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
    '/decks',
    createDeckValidators,
    validate(),
    authenticate(
        'You must be logged in to create a deck. Please log in and try again.',
    ),
    createDeck,
);
decks.put(
    '/decks/:publicID',
    saveDeckValidators,
    validate(),
    authenticate(
        'You do not have permission to modify this deck. If this deck is yours, please log in and try again.',
    ),
    saveDeck,
);
decks.get(
    '/decks',
    authenticate(
        'You must be logged in to view your decks. Please log in and try again.',
    ),
    listDecks,
);
decks.get('/decks/:publicID', getDeck);
decks.delete('/decks/:publicID', deleteDeck);
decks.get('/decks/:publicID/export', exportDeck);
decks.get('/decks/:publicID/download', downloadDeck);

export default decks;
