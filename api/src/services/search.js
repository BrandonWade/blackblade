import SearchRepository from '../repositories/search';

const basicSearch = (query) => {
    const queryTokens = query.split(/\s+/);

    return SearchRepository.getCardsByName(queryTokens);
};

export default {
    basicSearch,
};
