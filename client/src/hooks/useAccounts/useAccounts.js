import useFetch from '../useFetch';

export default function useAccounts() {
    const { fetchJSON } = useFetch();

    const register = async (email = '', password = '', confirmPassword = '') => {
        const response = await fetchJSON('/api/accounts', 'POST', { email, password, confirm_password: confirmPassword });

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    message: response.data.message,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const requestPasswordReset = async (email = '') => {
        const response = await fetchJSON('/api/accounts/password/forgot', 'POST', { email });

        switch (response.status) {
            case 200:
                return {
                    success: true,
                    message: response.data.message,
                };
            default:
                return {
                    success: false,
                };
        }
    };

    const resetPassword = async (password = '', confirmPassword = '') => {
        const response = await fetchJSON('/api/accounts/password', 'POST', { password, confirm_password: confirmPassword });

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
        register,
        requestPasswordReset,
        resetPassword,
    };
}
