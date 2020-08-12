import { validationResult } from 'express-validator';
import * as HttpStatus from 'http-status-codes';
import SearchService from '../services/search';

const searchController = async (req, res) => {
    // TODO: Should be handled in middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            errors: errors.array(),
        });
    }

    const query = req.query['q'];
    let data = {};

    if (query) {
        const { results } = await SearchService.getCardsByName(query);
        data = results;
    }

    res.status(HttpStatus.OK).json(data);
};

export default searchController;
