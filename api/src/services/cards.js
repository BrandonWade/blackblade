import CardRepository from '../repositories/cards';

const listCards = async (accountID) => {
    let cards;

    try {
        [cards] = await CardRepository.listCardsByAccountID(accountID);
    } catch (e) {
        console.error('error listing cards', e);
        throw e;
    }

    return {
        cards,
    };
};

const deleteCard = async (cardID, accountID) => {
    try {
        await CardRepository.deleteCard(cardID, accountID);
    } catch (e) {
        console.error('error deleting card', e);
        throw e;
    }

    return;
};

export default {
    listCards,
    deleteCard,
};
