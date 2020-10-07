const useSearch = (headers = {}) => {
    const basicSearch = async (name = '', page = 1) => {
        return advancedSearch({ name }, page);
    };

    const advancedSearch = async (criteria = {}, page = 1) => {
        let pairs = [];

        if (criteria?.name) {
            pairs = pairs.concat(`name=${criteria.name}`);
        }

        if (criteria?.text) {
            pairs = pairs.concat(`text=${criteria.text}`);
        }

        if (criteria?.type) {
            pairs = pairs.concat(`type=${criteria.type}`);
        }

        if (criteria?.colors) {
            Object.keys(criteria?.colors).forEach(color => {
                if (criteria?.colors[color]) {
                    pairs = pairs.concat(`${[color]}=${criteria.colors[color]}`);
                }
            });
        }

        if (criteria?.manaCost) {
            pairs = pairs.concat(`mana_cost=${criteria.manaCost}`);
        }

        if (pairs.length === 0) {
            return;
        }

        pairs = pairs.concat(`page=${page}`);

        const paramString = pairs.join('&');
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

    return {
        basicSearch,
        advancedSearch,
        getCardByID,
    };
};

export default useSearch;
