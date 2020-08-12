import express from 'express';
import searchValidators from './validators/search';
import searchController from './controllers/search';

const router = express.Router();

router.get('/search', searchValidators, searchController);

export default router;
