function useSearch(headers = {}) {
    const getParamString = (params = {}) => {
        let pairs = [];

        if (params?.name) {
            pairs = pairs.concat(`name=${params.name}`);
        }

        if (params?.text) {
            pairs = pairs.concat(`text=${params.text}`);
        }

        if (params?.type) {
            pairs = pairs.concat(`type=${params.type}`);
        }

        if (params?.colors) {
            Object.keys(params.colors).forEach(color => {
                if (params?.colors[color]) {
                    pairs = pairs.concat(`${[color]}=${params.colors[color]}`);
                }
            });

            if (Object.values(params.colors).some(color => color === true)) {
                pairs = pairs.concat(`match_type=${params.matchType}`);
            }
        }

        if (params?.set) {
            pairs = pairs.concat(`set=${params.set}`);
        }

        if (params?.rarities) {
            Object.keys(params.rarities).forEach(rarity => {
                if (params?.rarities[rarity]) {
                    pairs = pairs.concat(`${[rarity]}=${params.rarities[rarity]}`);
                }
            });
        }

        pairs = pairs.concat(`page=${params?.page || 1}`);

        if (pairs.length === 0) {
            return;
        }

        return pairs.join('&');
    };

    const getCardByID = async id => {
        const response = await fetch(`/api/cards/${id}`, {
            headers: {
                ...headers,
            },
        });

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    results: await response.json(),
                };
            case 404:
                return {
                    success: true,
                    results: [],
                };
            case 422:
                return {
                    success: false,
                    redirect: '/',
                };
            default:
                return {
                    success: false,
                    errors: await response.json(),
                };
        }
    };

    const getRandomCard = async () => {
        const response = await fetch('/api/cards/random', {
            headers: {
                ...headers,
            },
        });

        switch (response.status) {
            case 200:
                const results = await response.json();
                return {
                    success: true,
                    redirect: `/cards/${results.card_id}`,
                    results,
                };
            default:
                return {
                    success: false,
                    errors: await response.json(),
                };
        }
    };

    const searchCards = async (params = {}) => {
        const paramString = getParamString(params);
        const response = await fetch(`/api/search?${paramString}`, {
            headers: {
                ...headers,
            },
        });

        switch (response.status) {
            case 200:
                const data = await response.json();
                return {
                    success: true,
                    totalResults: data.total_results,
                    pages: data.pages,
                    results: data.results,
                };
            default:
                return {
                    success: false,
                    errors: await response.json(),
                };
        }
    };

    return {
        getParamString,
        getCardByID,
        getRandomCard,
        searchCards,
    };
}

export default useSearch;
