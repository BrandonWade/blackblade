import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import SearchService from '../services/search';
import { errorMessage } from '../helpers/messages';

const searchCards = async (req, res) => {
    const {
        name,
        text,
        selectedTypes,
        white,
        blue,
        black,
        red,
        green,
        colorless,
        matchType,
        selectedSets,
        cmcComparator,
        powerComparator,
        toughnessComparator,
        loyaltyComparator,
        common,
        uncommon,
        rare,
        mythic,
        flavorText,
    } = req.query;
    const cmcValue = parseInt(req.query['cmcValue']);
    const powerValue = parseInt(req.query['powerValue']);
    const toughnessValue = parseInt(req.query['toughnessValue']);
    const loyaltyValue = parseInt(req.query['loyaltyValue']);
    const page = parseInt(req.query['page']);
    let results;

    try {
        results = await SearchService.searchCards({
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
            message: errorMessage(
                'An error occurred while performing your search.',
            ),
        });
    }

    return res.status(StatusCodes.OK).json(results);
};

const getCardByID = async (req, res) => {
    const { id } = req.params;
    let results;

    try {
        results = await SearchService.getCardByID(id);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).send();
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: errorMessage(
                    'An error occurred while searching for this card.',
                ),
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
            message: errorMessage(
                'An error occurred while retrieving a random card.',
            ),
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
            message: errorMessage(
                'An error occurred while retrieving available card types.',
            ),
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
            message: errorMessage(
                'An error occurred while retrieving available card sets.',
            ),
        });
    }

    return res.status(StatusCodes.OK).json(results);
};

export { searchCards, getCardByID, getRandomCard, getCardTypes, getCardSets };
