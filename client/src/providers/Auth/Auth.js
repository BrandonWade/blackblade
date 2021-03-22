import { useState } from 'react';
import AuthContext from '../../contexts/Auth';

function AuthProvider({ children = [] }) {
    const [authenticated, setAuthenticated] = useState(document.cookie.includes('sid'));
    // const [authenticated, setAuthenticated] = useState(true);
    const [accountPublicID, setAccountPublicID] = useState('');

    const props = {
        authenticated,
        accountPublicID,
        setAuthenticated,
        setAccountPublicID,
    };

    return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
