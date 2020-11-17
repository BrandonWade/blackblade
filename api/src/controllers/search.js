import * as HttpStatus from 'http-status-codes';
import SearchService from '../services/search';

const search = async (req, res) => {
    const name = req.query['name'];
    const text = req.query['text'];
    const type = req.query['type'];
    const white = req.query['white'];
    const blue = req.query['blue'];
    const black = req.query['black'];
    const red = req.query['red'];
    const green = req.query['green'];
    const page = parseInt(req.query['page']);

    const results = await SearchService.search({
        name,
        text,
        type,
        colours: { W: white, U: blue, B: black, R: red, G: green },
        page,
    });

    res.status(HttpStatus.OK).json(results);
};

const getCardByID = async (req, res) => {
    const id = req.params['id'];
    const results = await SearchService.getCardByID(id);
    if (results.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).send();
    } else {
        return res.status(HttpStatus.OK).json(results);
    }
};

const getRandomCard = async (_, res) => {
    const results = await SearchService.getRandomCard();
    res.status(HttpStatus.OK).json(results);
};

export { search, getCardByID, getRandomCard };
