import express from 'express';
import validate from '../middleware/validate';
import { searchValidators } from '../validators/search';
import { searchCards, getCardTypes, getCardSets } from '../controllers/search';

const search = express.Router();

search.get('/search', searchValidators, validate(), searchCards);
search.get('/types', getCardTypes);
search.get('/sets', getCardSets);

export default search;
