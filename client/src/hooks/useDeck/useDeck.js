const useDeck = (headers = {}) => {
    const createDeck = async (name = '') => {
        const response = await fetch('/api/decks', {
            method: 'POST',
            headers: {
                ...headers,
            },
            body: {
                name,
            },
        });

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

    const saveDeck = async (publicID = '', deck = []) => {
        const response = await fetch(`/api/decks/${publicID}`, {
            method: 'PUT',
            headers: {
                ...headers,
            },
            body: JSON.stringify(deck),
        });

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
        const response = await fetch(`/api/decks/${publicID}`, {
            headers: {
                ...headers,
            },
        });

        switch (response.status) {
            case 200:
                const data = await response.json();
                return {
                    success: true,
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
};

export default useDeck;
