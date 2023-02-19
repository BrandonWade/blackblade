import useFetch from '../useFetch';

export default function useAuth() {
    const { fetchJSON } = useFetch();

    const getCSRFToken = async () => {
        const response = await fetchJSON('/api/csrf', 'GET');

        switch (response.status) {
            case 200:
                return {
                    success: true,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const login = async (email = '', password = '') => {
        const response = await fetchJSON('/api/login', 'POST', { email: email.trim(), password: password.trim() });

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    accountPublicID: response.data.account_public_id,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const logout = async () => {
        const response = await fetchJSON('/api/logout', 'GET');

        switch (response.status) {
            case 200:
                return {
                    success: true,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    return {
        getCSRFToken,
        login,
        logout,
    };
}
