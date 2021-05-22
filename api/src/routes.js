import express from 'express';
import auth from './routes/auth';
import search from './routes/search';
import cards from './routes/cards';
import decks from './routes/decks';
import accounts from './routes/accounts';

const router = express.Router();

router.use(auth);
router.use(search);
router.use(cards);
router.use(decks);
router.use(accounts);

export default router;
