import SearchRepository from '../repositories/search';

const pageSize = 60;

const basicSearch = async (query, page) => {
    const queryTokens = query.split(/\s+/);
    const totalResults = await SearchRepository.getTotalResults(queryTokens);
    const cardResults = await SearchRepository.getCardsByName(
        queryTokens,
        page,
        pageSize,
    );

    return {
        total_results: totalResults.results[0].total_results,
        pages: Math.ceil(totalResults.results[0].total_results / pageSize),
        results: cardResults.results,
    };
};

const getCardByID = (id) => {
    return SearchRepository.getCardByID(id);
};

export default {
    basicSearch,
    getCardByID,
};
