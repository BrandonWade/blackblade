import express from 'express';
import { searchValidators, cardValidators } from './validators/search';
import {
    search,
    getCardByID,
    getRandomCard,
    getCardTypes,
    getCardSets,
} from './controllers/search';
import { createDeck, saveDeck, getDeck } from './controllers/decks';
import { registerAccount } from './controllers/accounts';
import validate from './middleware/validate';

const router = express.Router();

router.get('/search', searchValidators, validate, search);
router.get('/cards/random', getRandomCard);
router.get('/cards/:id', cardValidators, validate, getCardByID);
router.get('/types', getCardTypes);
router.get('/sets', getCardSets);
router.post('/decks', createDeck);
router.put('/decks/:publicID', saveDeck);
router.get('/decks/:publicID', getDeck);
router.post('/accounts/register', registerAccount);

export default router;
