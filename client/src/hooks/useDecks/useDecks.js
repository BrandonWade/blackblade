import useFetch from '../useFetch';

export default function useDecks() {
    const { fetchData } = useFetch();

    const createDeck = async (name = '', visibility = 'private', notes = '') => {
        const response = await fetchData('/api/decks', 'POST', { name, visibility, notes });
        const data = await response.json();

        switch (response.status) {
            case 201:
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

    const saveDeck = async (publicID = '', name = '', visibility = 'private', notes = '', deckCards = [], maybeboardCards = []) => {
        function processCards(cards, location) {
            return cards.map(card => ({
                count: card.count,
                name: card.name,
                combined_cost: card.faces_json.map(f => f.mana_cost).join(''),
                is_white: card.faces_json.some(f => f.is_white),
                is_blue: card.faces_json.some(f => f.is_blue),
                is_black: card.faces_json.some(f => f.is_black),
                is_red: card.faces_json.some(f => f.is_red),
                is_green: card.faces_json.some(f => f.is_green),
                card_id: card.card_id,
                selection_type: card.selection_type,
                location,
            }));
        }

        const deck = processCards(deckCards, 'deck');
        const maybeboard = processCards(maybeboardCards, 'maybeboard');
        const response = await fetchData(`/api/decks/${publicID}`, 'PUT', { name, visibility, notes, deck, maybeboard });

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
                    notes: data.notes,
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
