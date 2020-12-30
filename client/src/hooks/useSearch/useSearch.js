function useSearch(headers = {}) {
    const getParamString = (params = {}) => {
        let pairs = [];

        const addPair = name => (pairs = pairs.concat(`${[name]}=${params[name]}`));
        const addPairsFromObject = obj => {
            Object.keys(obj).forEach(key => {
                if (obj[key]) {
                    pairs = pairs.concat(`${[key]}=${obj[key]}`);
                }
            });
        };

        if (params?.name) {
            addPair('name');
        }

        if (params?.text) {
            addPair('text');
        }

        if (params?.type) {
            addPair('type');
        }

        if (params?.colors) {
            addPairsFromObject(params.colors);

            if (Object.values(params.colors).some(color => color === true)) {
                addPair('matchType');
            }
        }

        if (params?.set) {
            addPair('set');
        }

        if (params?.rarities) {
            addPairsFromObject(params.rarities);
        }

        addPair('page');

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
