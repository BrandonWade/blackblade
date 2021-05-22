import express from 'express';
import validate from '../middleware/validate';
import { cardValidators } from '../validators/card';
import { getCardByID, getRandomCard } from '../controllers/search';

const cards = express.Router();

cards.get('/cards/random', getRandomCard);
cards.get('/cards/:id', cardValidators, validate(), getCardByID);

export default cards;
