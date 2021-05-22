import express from 'express';
import validate from '../middleware/validate';
import { cardValidators } from '../validators/card';
import { getCardByID, getRandomCard } from '../controllers/search';

const cards = express.Router();

cards.get('/random', getRandomCard);
cards.get('/:id', cardValidators, validate(), getCardByID);

export default cards;
