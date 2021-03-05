import useFetch from '../useFetch';

function useAuth() {
    const { fetchData } = useFetch();

    const login = async (email = '', password = '') => {
        const response = await fetchData('/api/login', 'POST', { email, password });

        switch (response.status) {
            case 200:
                return {
                    success: true,
                };
            default:
                return {
                    success: false,
                    errors: await response.json(),
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
                    errors: await response.json(),
                };
        }
    };

    return {
        login,
        logout,
    };
}

export default useAuth;
