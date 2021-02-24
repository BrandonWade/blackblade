import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import SearchService from '../services/search';

const searchCards = async (req, res) => {
    const name = req.query['name'];
    const text = req.query['text'];
    const selectedTypes = req.query['selectedTypes'];
    const white = req.query['white'];
    const blue = req.query['blue'];
    const black = req.query['black'];
    const red = req.query['red'];
    const green = req.query['green'];
    const colorless = req.query['colorless'];
    const matchType = req.query['matchType'];
    const selectedSets = req.query['selectedSets'];
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
    let results;

    try {
        results = await SearchService.search({
            name,
            text,
            selectedTypes,
            colors: { W: white, U: blue, B: black, R: red, G: green },
            colorless,
            matchType,
            selectedSets,
            cmc: { comparator: cmcComparator, value: cmcValue },
            power: { comparator: powerComparator, value: powerValue },
            toughness: {
                comparator: toughnessComparator,
                value: toughnessValue,
            },
            loyalty: { comparator: loyaltyComparator, value: loyaltyValue },
            rarities: { common, uncommon, rare, mythic },
            flavorText,
            page,
        });
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error searching cards' }],
        });
    }

    return res.status(StatusCodes.OK).json(results);
};

const getCardByID = async (req, res) => {
    const id = req.params['id'];
    let results;

    try {
        results = await SearchService.getCardByID(id);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).send();
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: [{ msg: 'error searching by card id' }],
            });
        }
    }

    return res.status(StatusCodes.OK).json(results);
};

const getRandomCard = async (_, res) => {
    let results;

    try {
        results = await SearchService.getRandomCard();
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error getting random card' }],
        });
    }

    return res.status(StatusCodes.OK).json(results);
};

const getCardTypes = async (_, res) => {
    let results;

    try {
        results = await SearchService.getCardTypes();
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error getting card types' }],
        });
    }

    return res.status(StatusCodes.OK).json(results);
};

const getCardSets = async (_, res) => {
    let results;

    try {
        results = await SearchService.getCardSets();
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: 'error getting card sets' }],
        });
    }

    return res.status(StatusCodes.OK).json(results);
};

export { searchCards, getCardByID, getRandomCard, getCardTypes, getCardSets };
