import useFetch from '../useFetch';

function useAccount() {
    const { fetchData } = useFetch();

    const register = async (email = '', password = '', confirmPassword = '') => {
        const response = await fetchData('/api/accounts', 'POST', { email, password, confirm_password: confirmPassword });
        const data = await response.json();

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    message: data.message,
                };
            default:
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    const requestPasswordReset = async (email = '') => {
        const response = await fetchData('/api/accounts/password/forgot', 'POST', { email });
        const data = await response.json();

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    message: data.message,
                };
            default:
                return {
                    success: false,
                    message: data.message,
                };
        }
    };

    const resetPassword = async (password = '', confirmPassword = '') => {
        const response = await fetchData('/api/accounts/password', 'POST', { password, confirm_password: confirmPassword });
        const data = await response.json();

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    message: data.message,
                };
            default:
                return {
                    success: false,
                    message: data.message,
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
