import { useCallback } from 'react';
import cookies from 'js-cookie';

function useFetch() {
    const fetchData = useCallback(async (url = '', method = 'GET', body = {}, headers = {}) => {
        const options = {
            method,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': cookies.get('ct'),
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
