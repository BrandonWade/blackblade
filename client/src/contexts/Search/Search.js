import { createContext } from 'react';

export const initialState = {
    name: '',
    text: '',
    types: '',
    colors: {
        white: false,
        blue: false,
        black: false,
        red: false,
        green: false,
        colorless: false,
    },
    matchType: 'exact',
    set: '',
    rarities: {
        common: false,
        uncommon: false,
        rare: false,
        mythic: false,
    },
    flavorText: '',
    page: 1,
    totalResults: 0,
    searchResults: [],
    numberOfPages: 1,
};

export default createContext(initialState);
