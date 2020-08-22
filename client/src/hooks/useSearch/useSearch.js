const useSearch = (headers = {}) => {
    const basicSearch = async query => {
        const response = await fetch(`/api/search?q=${query}`, {
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
        getCardByID,
    };
};

export default useSearch;
