import { createContext } from 'react';

export const initialState = {
    visible: false,
    deckExport: '',
};

export default createContext(initialState);
