import express from 'express';
import { basicSearchValidators, cardValidators } from './validators/search';
import { basicSearch, getCardByID } from './controllers/search';

const router = express.Router();

router.get('/search', basicSearchValidators, basicSearch);
router.get('/cards/:id', cardValidators, getCardByID);

export default router;
