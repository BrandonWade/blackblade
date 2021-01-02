import { useCallback } from 'react';

function useFetch() {
    const fetchData = useCallback(async (url = '', method = 'GET', body = {}, headers = {}) => {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        if (method !== 'GET' && method !== 'HEAD') {
            options['body'] = JSON.stringify(body);
        }

        return await fetch(url, options);
    }, []);

    return {
        fetchData,
    };
}

export default useFetch;
