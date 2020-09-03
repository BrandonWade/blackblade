import { createContext } from 'react';

export default createContext({
    query: '',
    setQuery: () => {},
    totalResults: 0,
    setTotalResults: () => {},
    searchResults: [],
    setSearchResults: () => {},
    numberOfPages: 1,
    setNumberOfPages: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
});
