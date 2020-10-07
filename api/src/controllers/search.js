import { validationResult } from 'express-validator';
import * as HttpStatus from 'http-status-codes';
import SearchService from '../services/search';

const basicSearch = async (req, res) => {
    // TODO: Should be handled in middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            errors: errors.array(),
        });
    }

    const query = req.query['name'];
    const page = parseInt(req.query['page']);
    let data = {};

    if (query) {
        const results = await SearchService.basicSearch(query, page);
        data = results;
    }

    res.status(HttpStatus.OK).json(data);
};

const getCardByID = async (req, res) => {
    // TODO: Should be handled in middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            errors: errors.array(),
        });
    }

    const id = req.params['id'];
    const results = await SearchService.getCardByID(id);
    if (results.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).send();
    } else {
        return res.status(HttpStatus.OK).json(results);
    }
};

export { basicSearch, getCardByID };
