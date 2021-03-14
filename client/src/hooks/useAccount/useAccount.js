import useFetch from '../useFetch';

function useAccount() {
    const { fetchData } = useFetch();

    const register = async (email = '', password = '', confirmPassword = '') => {
        const response = await fetchData('/api/accounts', 'POST', { email, password, confirm_password: confirmPassword });

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

    const requestPasswordReset = async (email = '') => {
        const response = await fetchData('/api/accounts/password/forgot', 'POST', { email });

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

    const resetPassword = async (password = '', confirmPassword = '') => {
        const response = await fetchData('/api/accounts/password', 'POST', { password, confirm_password: confirmPassword });

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
        register,
        requestPasswordReset,
        resetPassword,
    };
}

export default useAccount;
