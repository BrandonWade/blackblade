import SearchRepository from '../repositories/search';

const pageSize = 60;

const search = async (params = {}) => {
    const nameTokens = params?.name?.split(/\s+/) || [];
    const textTokens = params?.text?.split(/\s+/) || [];
    const selectedTypeTokens = params?.selectedTypes?.split(/,/) || [];
    const colors = Object.keys(params?.colors).filter((c) => params?.colors[c]);
    const selectedSetTokens = params?.selectedSets?.split(/,/) || [];
    const rarities = Object.keys(params?.rarities).filter(
        (r) => params?.rarities[r],
    );
    const flavorTextTokens = params?.flavorText?.split(/\s+/) || [];

    const totalResults = await SearchRepository.getTotalResults(
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

    const cardResults = await SearchRepository.getCardsByProperties(
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

    return {
        total_results: totalResults[0].total_results,
        pages: Math.ceil(totalResults[0].total_results / pageSize),
        results: cardResults,
    };
};

const getCardByID = async (id) => {
    const [result] = await SearchRepository.getCardByID(id);
    return result;
};

const getRandomCard = async () => {
    const [result] = await SearchRepository.getRandomCard();
    return result[0];
};

const getCardTypes = async () => {
    const [results] = await SearchRepository.getCardTypes();

    return {
        card_types: results,
    };
};

const getCardSets = async () => {
    const [results] = await SearchRepository.getCardSets();

    return {
        card_sets: results,
    };
};

export default {
    search,
    getCardByID,
    getRandomCard,
    getCardTypes,
    getCardSets,
};
