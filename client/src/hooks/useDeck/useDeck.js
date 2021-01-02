import useFetch from '../useFetch';

function useDeck() {
    const { fetchData } = useFetch();

    const createDeck = async (name = '') => {
        const response = await fetchData('/api/decks', 'POST', { name });

        switch (response.status) {
            case 200:
                const data = await response.json();
                return {
                    success: true,
                    deckURI: data.deck_uri,
                };
            default:
                return {
                    success: false,
                    errors: await response.json(),
                };
        }
    };

    const saveDeck = async (publicID = '', name = '', deck = [], maybeboard = []) => {
        const cards = [
            ...deck.map(card => ({ count: card.count, card_id: card.card_id, selection_type: card.selection_type, location: 'deck' })),
            ...maybeboard.map(card => ({ count: card.count, card_id: card.card_id, selection_type: card.selection_type, location: 'maybeboard' })),
        ];
        const response = await fetchData(`/api/decks/${publicID}`, 'PUT', { name, cards });

        switch (response.status) {
            case 200:
                return {
                    success: true,
                };
            default:
                return {
                    success: false,
                    errors: await response.json(),
                };
        }
    };

    const getDeck = async (publicID = '') => {
        const response = await fetchData(`/api/decks/${publicID}`);

        switch (response.status) {
            case 200:
                const data = await response.json();
                return {
                    success: true,
                    name: data.name,
                    cards: data.cards,
                };
            default:
                return {
                    success: false,
                    errors: await response.json(),
                };
        }
    };

    return {
        createDeck,
        saveDeck,
        getDeck,
    };
}

export default useDeck;
