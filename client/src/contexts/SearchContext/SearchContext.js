import { createContext } from 'react';

export default createContext({
    name: '',
    setName: () => {},
    text: '',
    setText: () => {},
    type: '',
    setType: () => {},
    page: 1,
    setPage: () => {},
    totalResults: 0,
    setTotalResults: () => {},
    searchResults: [],
    setSearchResults: () => {},
    numberOfPages: 1,
    setNumberOfPages: () => {},
});
