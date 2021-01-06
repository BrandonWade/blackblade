import useFetch from '../useFetch';

function useSearch() {
    const { fetchData } = useFetch();

    const getParamString = (params = {}) => {
        let pairs = [];

        const addPair = (name, fallback) => (pairs = pairs.concat(`${name}=${params[name] || fallback}`));
        const addNestedPair = name => {
            const keys = Object.keys(params[name]);
            keys.forEach(key => {
                const capitalized = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
                const queryKey = `${name}${capitalized}`;
                pairs = pairs.concat(`${queryKey}=${params[name][key]}`);
            });
        };
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

        if (params?.types) {
            addPair('types');
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

        if (params?.cmc && params?.cmc?.value !== '' && parseInt(params?.cmc) !== NaN) {
            addNestedPair('cmc');
        }

        if (params?.power && params?.power?.value !== '' && parseInt(params?.power) !== NaN) {
            addNestedPair('power');
        }

        if (params?.toughness && params?.toughness?.value !== '' && parseInt(params?.toughness) !== NaN) {
            addNestedPair('toughness');
        }

        if (params?.loyalty && params?.loyalty?.value !== '' && parseInt(params?.loyalty) !== NaN) {
            addNestedPair('loyalty');
        }

        if (params?.rarities) {
            addPairsFromObject(params.rarities);
        }

        if (params?.flavorText) {
            addPair('flavorText');
        }

        if (pairs.length === 0) {
            return;
        }

        addPair('page', 1);

        return pairs.join('&');
    };

    const getCardByID = async id => {
        const response = await fetchData(`/api/cards/${id}`);

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
        const response = await fetchData('/api/cards/random');

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
        if (paramString === undefined) {
            return {
                success: false,
                errors: ['invalid params'],
            };
        }

        const response = await fetchData(`/api/search?${paramString}`);

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
