import useFetch from '../useFetch';

function useDeck() {
    const { fetchData } = useFetch();

    const createDeck = async (name = '', visibility = 'private') => {
        const response = await fetchData('/api/decks', 'POST', { name, visibility });
        const data = await response.json();

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    deckURI: data.deck_uri,
                    accountPublicID: data.account_public_id,
                };
            default:
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    const saveDeck = async (publicID = '', name = '', visibility = 'private', deck = [], maybeboard = []) => {
        const cards = [
            ...deck.map(card => ({
                count: card.count,
                card_id: card.card_id,
                selection_type: card.selection_type,
                location: 'deck',
            })),
            ...maybeboard.map(card => ({
                count: card.count,
                card_id: card.card_id,
                selection_type: card.selection_type,
                location: 'maybeboard',
            })),
        ];
        const response = await fetchData(`/api/decks/${publicID}`, 'PUT', { name, visibility, cards });

        switch (response.status) {
            case 200:
                return {
                    success: true,
                };
            case 401:
                return {
                    success: false,
                };
            default:
                const data = await response.json();
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    const getDeck = async (publicID = '') => {
        const response = await fetchData(`/api/decks/${publicID}`);

        switch (response.status) {
            case 200: {
                const data = await response.json();
                return {
                    success: true,
                    accountPublicID: data.account_public_id,
                    name: data.name,
                    visibility: data.visibility,
                    cards: data.cards,
                };
            }
            case 401:
                return {
                    success: false,
                };
            default: {
                const data = await response.json();
                return {
                    success: false,
                    message: data.message,
                };
            }
        }
    };

    return {
        createDeck,
        saveDeck,
        getDeck,
    };
}

export default useDeck;
