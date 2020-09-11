import express from 'express';
import { basicSearchValidators, cardValidators } from './validators/search';
import { basicSearch, getCardByID } from './controllers/search';
import { createDeck, saveDeck, getDeck } from './controllers/decks';

const router = express.Router();

router.get('/search', basicSearchValidators, basicSearch);
router.get('/cards/:id', cardValidators, getCardByID);
router.post('/decks', createDeck);
router.put('/decks/:publicID', saveDeck);
router.get('/decks/:publicID', getDeck);

export default router;
