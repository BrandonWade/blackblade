import SearchRepository from '../repositories/search';

const getCardsByName = (query) => {
    const queryTokens = query.split(/\s+/);

    return SearchRepository.getCardsByName(queryTokens);
};

export default {
    getCardsByName,
};
