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
            data = await response.json();
        } catch (e) {}

        if (data.message) {
            const { text, type } = data.message;
            showMessage({ text, type });
        }

        let errors = [];
        switch (response.status) {
            case 401:
                history.push('/login');
                return {
                    success: false,
                };
            case 422:
                errors = data.errors.map(e => e.msg.split('\n')).flat(Infinity);
                break;
            case 500:
                if (!data.message) {
                    showMessage({ text: 'An unexpected error has occurred. Please wait a few moments and try again.', type: 'error' });
                }
                break;
            default:
                break;
        }

        return {
            status: response.status,
            errors,
            data,
        };
    }, []);

    return {
        fetchData,
        fetchJSON,
    };
}
