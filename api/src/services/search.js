import NotFoundError from '../errors/not_found';
import SearchRepository from '../repositories/search';

const pageSize = 60;

const searchCards = async (params = {}) => {
    const nameTokens = params?.name?.split(/\s+/) || [];
    const textTokens = params?.text?.split(/\s+/) || [];
    const selectedTypeTokens = params?.selectedTypes?.split(/,/) || [];
    const colors = Object.keys(params?.colors).filter((c) => params?.colors[c]);
    const selectedSetTokens = params?.selectedSets?.split(/,/) || [];
    const rarities = Object.keys(params?.rarities).filter(
        (r) => params?.rarities[r],
    );
    const flavorTextTokens = params?.flavorText?.split(/\s+/) || [];
    let totalResults;
    let results;

    try {
        [totalResults] = await SearchRepository.getTotalResults(
            nameTokens,
            textTokens,
            selectedTypeTokens,
            colors,
            params?.colorless,
            params?.matchType,
            selectedSetTokens,
            params?.cmc,
            params?.power,
            params?.toughness,
            params?.loyalty,
            rarities,
            flavorTextTokens,
        );

        results = await SearchRepository.getCardsByProperties(
            nameTokens,
            textTokens,
            selectedTypeTokens,
            colors,
            params?.colorless,
            params?.matchType,
            selectedSetTokens,
            params?.cmc,
            params?.power,
            params?.toughness,
            params?.loyalty,
            rarities,
            flavorTextTokens,
            params?.page,
            pageSize,
        );
    } catch (e) {
        console.error('error searching cards', e);
        throw e;
    }

    return {
        total_results: totalResults.total_results,
        pages: Math.ceil(totalResults.total_results / pageSize),
        results,
    };
};

const getCardByID = async (id) => {
    let result;

    try {
        [result] = await SearchRepository.getCardByID(id);

        if (!result.length) {
            throw new NotFoundError(`no card found with id ${id}`);
        }
    } catch (e) {
        console.error('error searching by card id', e);
        throw e;
    }

    return result;
};

const getRandomCard = async () => {
    let result;

    try {
        [result] = await SearchRepository.getRandomCard();
    } catch (e) {
        console.error('error getting random card', e);
        throw e;
    }

    return result[0];
};

const getCardTypes = async () => {
    let results;

    try {
        [results] = await SearchRepository.getCardTypes();
    } catch (e) {
        console.error('error getting card types', e);
        throw e;
    }

    return {
        card_types: results,
    };
};

const getCardSets = async () => {
    let results;

    try {
        [results] = await SearchRepository.getCardSets();
    } catch (e) {
        console.error('error getting card sets', e);
        throw e;
    }

    return {
        card_sets: results,
    };
};

export default {
    searchCards,
    getCardByID,
    getRandomCard,
    getCardTypes,
    getCardSets,
};
