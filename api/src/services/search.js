import SearchRepository from '../repositories/search';

const pageSize = 60;

const basicSearch = async (params = {}) => {
    const nameTokens = params?.name?.split(/\s+/) || [];
    const textTokens = params?.text?.split(/\s+/) || [];
    const typeTokens = params?.type?.split(/\s+/) || [];
    const [totalResults] = await SearchRepository.getTotalResults(
        nameTokens,
        textTokens,
        typeTokens,
    );
    const [cardResults] = await SearchRepository.getCardsByName(
        nameTokens,
        textTokens,
        typeTokens,
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

export default {
    basicSearch,
    getCardByID,
};
