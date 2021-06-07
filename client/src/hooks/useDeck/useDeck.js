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
                    deckPublicID: data.deck_public_id,
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
        function processCards(cards, location) {
            return cards.map(card => ({
                count: card.count,
                combined_name: card?.sets_json?.[0]?.card_faces?.map(f => f.name).join(' // '),
                combined_cost: card?.sets_json?.[0]?.card_faces?.map(f => f.mana_cost).join(''),
                card_id: card.card_id,
                selection_type: card.selection_type,
                location,
            }));
        }

        const cards = [...processCards(deck, 'deck'), ...processCards(maybeboard, 'maybeboard')];
        const response = await fetchData(`/api/decks/${publicID}`, 'PUT', { name, visibility, cards });

        switch (response.status) {
            case 200:
                return {
                    success: true,
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
                    deckPublicID: data.deck_public_id,
                    accountPublicID: data.account_public_id,
                    name: data.name,
                    visibility: data.visibility,
                    cards: data.cards,
                };
            }
            case 404:
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

    const listDecks = async () => {
        const response = await fetchData('/api/decks');
        const data = await response.json();

        switch (response.status) {
            case 200: {
                return {
                    success: true,
                    decks: data.decks,
                };
            }
            case 401:
                return {
                    success: false,
                    message: data.message,
                };
            default: {
                return {
                    success: false,
                    message: data.message,
                };
            }
        }
    };

    const deleteDeck = async (publicID = '') => {
        const response = await fetchData(`/api/decks/${publicID}`, 'DELETE');

        switch (response.status) {
            case 204:
                return {
                    success: true,
                };
            default:
                const data = await response.json();
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    const exportDeck = async (publicID = '') => {
        const response = await fetchData(`/api/decks/${publicID}/export`, 'GET');
        const data = await response.json();

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    deckExport: data.deck_export,
                };
            default:
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    return {
        createDeck,
        saveDeck,
        getDeck,
        listDecks,
        deleteDeck,
        exportDeck,
    };
}

export default useDeck;
