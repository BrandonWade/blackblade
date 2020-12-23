import SearchRepository from '../repositories/search';

const pageSize = 60;

const search = async (params = {}) => {
    const nameTokens = params?.name?.split(/\s+/) || [];
    const textTokens = params?.text?.split(/\s+/) || [];
    const typeTokens = params?.type?.split(/\s+/) || [];
    const colors = Object.keys(params?.colors).filter((c) => params?.colors[c]);
    const set = params?.set?.split(/\s+/) || [];
    const totalResults = await SearchRepository.getTotalResults(
        nameTokens,
        textTokens,
        typeTokens,
        colors,
        set,
    );

    const cardResults = await SearchRepository.getCardsByName(
        nameTokens,
        textTokens,
        typeTokens,
        colors,
        set,
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

export default {
    search,
    getCardByID,
    getRandomCard,
};
