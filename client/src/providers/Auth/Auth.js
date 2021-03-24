import { useState } from 'react';
import cookies from 'js-cookie';
import AuthContext from '../../contexts/Auth';

function AuthProvider({ children = [] }) {
    const [authenticated, setAuthenticated] = useState(cookies.get('sid') !== undefined);
    const [accountPublicID, setAccountPublicID] = useState(cookies.get('apid'));

    const props = {
        authenticated,
        accountPublicID,
        setAuthenticated,
        setAccountPublicID,
    };

    return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
