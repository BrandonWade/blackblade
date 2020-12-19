import SearchRepository from '../repositories/search';

const pageSize = 60;

const search = async (params = {}) => {
    const nameTokens = params?.name?.split(/\s+/) || [];
    const textTokens = params?.text?.split(/\s+/) || [];
    const typeTokens = params?.type?.split(/\s+/) || [];
    const colours = Object.keys(params?.colours).filter(
        (c) => params?.colours[c],
    );
    const set = params?.set || '';
    const totalResults = await SearchRepository.getTotalResults(
        nameTokens,
        textTokens,
        typeTokens,
        colours,
        set,
    );

    const cardResults = await SearchRepository.getCardsByName(
        nameTokens,
        textTokens,
        typeTokens,
        colours,
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
