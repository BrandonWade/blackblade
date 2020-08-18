import { createContext } from 'react';

export const initialState = [];

export default createContext({
    searchResults: initialState,
    setSearchResults: () => {},
});
