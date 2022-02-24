import useFetch from '../useFetch';

export default function useAccounts() {
    const { fetchJSON } = useFetch();

    const register = async (email = '', newPassword = '', confirmPassword = '') => {
        const response = await fetchJSON('/api/accounts', 'POST', { email, newPassword, confirmPassword });

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

    const resetPassword = async (newPassword = '', confirmPassword = '') => {
        const response = await fetchJSON('/api/accounts/password/reset', 'POST', { newPassword, confirmPassword });

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

    const changePassword = async (currentPassword = '', newPassword = '', confirmPassword = '') => {
        const response = await fetchJSON('/api/accounts/password/change', 'POST', {
            currentPassword,
            newPassword,
            confirmPassword,
        });

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

    const deleteAccount = async () => {
        const response = await fetchJSON('/api/accounts', 'DELETE');

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
        changePassword,
        deleteAccount,
    };
}
