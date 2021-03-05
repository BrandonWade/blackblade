import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../contexts/Auth';

function Logout() {
    const history = useHistory();
    const { logout } = useAuth();
    const { setAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const logoutOfAccount = async () => {
            const result = await logout();
            if (result?.success) {
                setAuthenticated(false);
                history.push('/login');
            }
        };
        logoutOfAccount();
    }, []);

    return null;
}

export default Logout;
