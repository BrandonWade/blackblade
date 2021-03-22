import { createContext } from 'react';

export const initialState = {
    authenticated: false,
    accountPublicID: '',
};

export default createContext(initialState);
