import { createContext } from 'react';

export const initialState = {
    name: '',
    text: '',
    type: '',
    colors: {
        white: false,
        blue: false,
        black: false,
        red: false,
        green: false,
        colorless: false,
    },
    page: 1,
    totalResults: 0,
    searchResults: [],
    numberOfPages: 1,
};

export default createContext(initialState);
