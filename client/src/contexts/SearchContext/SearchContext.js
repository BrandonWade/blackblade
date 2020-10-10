import { createContext } from 'react';

export default createContext({
    name: '',
    setName: () => {},
    text: '',
    setText: () => {},
    page: 1,
    setPage: () => {},
    totalResults: 0,
    setTotalResults: () => {},
    searchResults: [],
    setSearchResults: () => {},
    numberOfPages: 1,
    setNumberOfPages: () => {},
});
