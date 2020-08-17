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

    return {
        basicSearch,
    };
};

export default useSearch;
