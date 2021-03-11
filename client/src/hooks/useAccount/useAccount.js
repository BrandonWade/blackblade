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

    return {
        register,
    };
}

export default useAccount;
