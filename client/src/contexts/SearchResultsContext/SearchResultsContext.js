import { createContext } from 'react';

export default createContext({
    query: '',
    setQuery: () => {},
    searchResults: [],
    setSearchResults: () => {},
    numberOfPages: 1,
    setNumberOfPages: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
});
