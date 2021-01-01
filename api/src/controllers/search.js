import * as HttpStatus from 'http-status-codes';
import SearchService from '../services/search';

const search = async (req, res) => {
    const name = req.query['name'];
    const text = req.query['text'];
    const types = req.query['types'];
    const white = req.query['white'];
    const blue = req.query['blue'];
    const black = req.query['black'];
    const red = req.query['red'];
    const green = req.query['green'];
    const colorless = req.query['colorless'];
    const matchType = req.query['matchType'];
    const set = req.query['set'];
    const common = req.query['common'];
    const uncommon = req.query['uncommon'];
    const rare = req.query['rare'];
    const mythic = req.query['mythic'];
    const page = parseInt(req.query['page']);

    const results = await SearchService.search({
        name,
        text,
        types,
        colors: { W: white, U: blue, B: black, R: red, G: green },
        colorless,
        matchType,
        set,
        rarities: { common, uncommon, rare, mythic },
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

const getCardSets = async (_, res) => {
    const results = await SearchService.getCardSets();
    res.status(HttpStatus.OK).json(results);
};

export { search, getCardByID, getRandomCard, getCardSets };
