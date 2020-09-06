import express from 'express';
import { basicSearchValidators, cardValidators } from './validators/search';
import { basicSearch, getCardByID } from './controllers/search';
import { createDeck, getCardsByPublicID } from './controllers/decks';

const router = express.Router();

router.get('/search', basicSearchValidators, basicSearch);
router.get('/cards/:id', cardValidators, getCardByID);
router.post('/decks', createDeck);
router.get('/decks/:publicID', getCardsByPublicID);

export default router;
