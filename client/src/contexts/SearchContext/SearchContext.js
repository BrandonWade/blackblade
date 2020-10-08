import { createContext } from 'react';

export const colorInitialState = {
    white: false,
    blue: false,
    black: false,
    red: false,
    green: false,
};

export default createContext({
    name: '',
    setName: () => {},
    text: '',
    setText: () => {},
    type: '',
    setType: () => {},
    colors: colorInitialState,
    setColors: () => {},
    manaCost: '',
    setManaCost: () => {},
    page: 1,
    setPage: () => {},
    totalResults: 0,
    setTotalResults: () => {},
    searchResults: [],
    setSearchResults: () => {},
    numberOfPages: 1,
    setNumberOfPages: () => {},
});
