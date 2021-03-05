import { useState } from 'react';
import AuthContext from '../../contexts/Auth';

function AuthProvider({ children = [] }) {
    const [authenticated, setAuthenticated] = useState(false); // TODO: Check cookies for session

    const props = {
        authenticated,
        setAuthenticated,
    };

    return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
