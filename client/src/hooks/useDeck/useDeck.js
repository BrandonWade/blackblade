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

    return {
        createDeck,
    };
};

export default useDeck;
