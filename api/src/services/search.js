import SearchRepository from '../repositories/search';

const pageSize = 60;

const basicSearch = async (query, page) => {
    const queryTokens = query.split(/\s+/);
    const [totalResults] = await SearchRepository.getTotalResults(queryTokens);
    const [cardResults] = await SearchRepository.getCardsByName(
        queryTokens,
        page,
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
