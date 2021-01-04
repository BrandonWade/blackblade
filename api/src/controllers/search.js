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
    const cmcComparator = req.query['cmcComparator'];
    const cmcValue = parseInt(req.query['cmcValue']);
    const powerComparator = req.query['powerComparator'];
    const powerValue = parseInt(req.query['powerValue']);
    const toughnessComparator = req.query['toughnessComparator'];
    const toughnessValue = parseInt(req.query['toughnessValue']);
    const loyaltyComparator = req.query['loyaltyComparator'];
    const loyaltyValue = parseInt(req.query['loyaltyValue']);
    const common = req.query['common'];
    const uncommon = req.query['uncommon'];
    const rare = req.query['rare'];
    const mythic = req.query['mythic'];
    const flavorText = req.query['flavorText'];
    const page = parseInt(req.query['page']);

    const results = await SearchService.search({
        name,
        text,
        types,
        colors: { W: white, U: blue, B: black, R: red, G: green },
        colorless,
        matchType,
        set,
        cmc: { comparator: cmcComparator, value: cmcValue },
        power: { comparator: powerComparator, value: powerValue },
        toughness: { comparator: toughnessComparator, value: toughnessValue },
        loyalty: { comparator: loyaltyComparator, value: loyaltyValue },
        rarities: { common, uncommon, rare, mythic },
        flavorText,
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
