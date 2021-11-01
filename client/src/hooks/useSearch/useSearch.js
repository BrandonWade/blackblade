import useFetch from '../useFetch';
import useSelectedTypes from '../useSelectedTypes';

export default function useSearch() {
    const { fetchJSON } = useFetch();
    const { convertTypesToString } = useSelectedTypes();

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
        const addPairFromArray = name => {
            pairs = pairs.concat(`${name}=${params[name].join(',')}`);
        };

        if (params?.name) {
            addPair('name');
        }

        if (params?.text) {
            addPair('text');
        }

        if (params?.selectedTypes && params?.selectedTypes?.length > 0) {
            const selectedTypes = convertTypesToString(params.selectedTypes);
            pairs = pairs.concat(`selectedTypes=${selectedTypes}`);
        }

        if (params?.colors) {
            addPairsFromObject(params.colors);

            if (Object.values(params.colors).some(color => color === true)) {
                addPair('matchType');
            }
        }

        if (params?.selectedSets && params?.selectedSets?.length > 0) {
            addPairFromArray('selectedSets');
        }

        if (params?.cmc && params?.cmc?.value !== '' && !isNaN(parseInt(params?.cmc?.value))) {
            addNestedPair('cmc');
        }

        if (params?.power && params?.power?.value !== '' && !isNaN(parseInt(params?.power?.value))) {
            addNestedPair('power');
        }

        if (params?.toughness && params?.toughness?.value !== '' && !isNaN(parseInt(params?.toughness?.value))) {
            addNestedPair('toughness');
        }

        if (params?.loyalty && params?.loyalty?.value !== '' && !isNaN(parseInt(params?.loyalty?.value))) {
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

        return `?${pairs.join('&')}`;
    };

    const getCardByID = async id => {
        const response = await fetchJSON(`/api/cards/${id}`);

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    results: response.data,
                };
            case 404:
            case 422:
                return {
                    success: true,
                    results: [],
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const getRandomCard = async () => {
        const response = await fetchJSON('/api/cards/random');

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    redirect: `/cards/${response.data.card_id}`,
                    results: response.data,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const searchCards = async (params = {}) => {
        const paramString = getParamString(params);
        if (paramString === undefined) {
            return {
                success: false,
            };
        }

        const response = await fetchJSON(`/api/search${paramString}`);

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    totalResults: response.data.total_results,
                    pages: response.data.pages,
                    results: response.data.results,
                };
            default:
                return {
                    success: false,
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
