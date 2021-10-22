import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import cookies from 'js-cookie';
import useMessage from '../useMessage';

export default function useFetch() {
    const { showMessage } = useMessage();
    const history = useHistory();

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

    const fetchJSON = useCallback(async (url = '', method = 'GET', body = {}, headers = {}) => {
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

        const response = await fetch(url, options);
        let data = {};

        try {
            if (response.status !== 204) {
                data = await response.json();
            }
        } catch (e) {
            showMessage('An unexpected error has occurred. Please wait a few moments and try again.', 'error');
            return;
        }

        if (data.message) {
            const { text, type } = data.message;
            showMessage(text, type);
        }

        switch (response.status) {
            case 401:
                history.push('/login');
                return;
            case 500:
                return;
            default:
                break;
        }

        return {
            status: response.status,
            data,
        };
    }, []);

    return {
        fetchData,
        fetchJSON,
    };
}
