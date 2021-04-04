import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../contexts/Auth';

function Logout() {
    const history = useHistory();
    const { logout } = useAuth();
    const { setAuthenticated, setAccountPublicID } = useContext(AuthContext);

    useEffect(() => {
        const logoutOfAccount = async () => {
            const response = await logout();
            if (response?.success) {
                setAuthenticated(false);
                setAccountPublicID('');
                history.replace('/login');
            }
        };
        logoutOfAccount();
    }, []);

    return null;
}

export default Logout;
