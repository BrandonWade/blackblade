import { createContext } from 'react';

export const initialState = {
    authenticated: false,
};

export default createContext(initialState);
