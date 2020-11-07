import express from 'express';
import { searchValidators, cardValidators } from './validators/search';
import { search, getCardByID, getRandomCard } from './controllers/search';
import { createDeck, saveDeck, getDeck } from './controllers/decks';

const router = express.Router();

router.get('/search', searchValidators, search);
router.get('/cards/random', getRandomCard);
router.get('/cards/:id', cardValidators, getCardByID);
router.post('/decks', createDeck);
router.put('/decks/:publicID', saveDeck);
router.get('/decks/:publicID', getDeck);

export default router;
