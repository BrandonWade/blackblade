import SearchRepository from '../repositories/search';

const pageSize = 60;

const basicSearch = async (query, page) => {
    const queryTokens = query.split(/\s+/);
    const pageResults = await SearchRepository.getPageCount(
        queryTokens,
        pageSize,
    );
    const cardResults = await SearchRepository.getCardsByName(
        queryTokens,
        page,
        pageSize,
    );

    return {
        pages: pageResults.results[0].pages,
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
