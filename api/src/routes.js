import express from 'express';
import { basicSearchValidators, cardValidators } from './validators/search';
import { basicSearch, getCardByID } from './controllers/search';
import { createDeck } from './controllers/decks';

const router = express.Router();

router.get('/search', basicSearchValidators, basicSearch);
router.get('/cards/:id', cardValidators, getCardByID);
router.post('/decks', createDeck);

export default router;
