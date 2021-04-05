import useFetch from '../useFetch';

function useAuth() {
    const { fetchData } = useFetch();

    const login = async (email = '', password = '') => {
        const response = await fetchData('/api/login', 'POST', { email, password });
        const data = await response.json();

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    accountPublicID: data.account_public_id,
                };
            default:
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    const logout = async () => {
        const response = await fetchData('/api/logout', 'GET');

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
        login,
        logout,
    };
}

export default useAuth;
