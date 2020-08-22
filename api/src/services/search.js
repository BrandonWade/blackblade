import SearchRepository from '../repositories/search';

const basicSearch = (query) => {
    const queryTokens = query.split(/\s+/);

    return SearchRepository.getCardsByName(queryTokens);
};

const getCardByID = (id) => {
    return SearchRepository.getCardByID(id);
};

export default {
    basicSearch,
    getCardByID,
};
