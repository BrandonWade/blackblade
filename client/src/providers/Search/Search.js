import React, { useReducer } from 'react';
import SearchReducer from '../../reducers/Search';
import SearchContext, { initialState } from '../../contexts/Search';
import { SET_NAME, SET_TEXT, SET_TYPE, SET_COLORS, SET_SET, SET_PAGE, SET_TOTAL_RESULTS, SET_SEARCH_RESULTS, SET_NUMBER_OF_PAGES } from '../../actions/Search';

function SearchProvider({ children = [] }) {
    const [state, dispatch] = useReducer(SearchReducer, initialState);

    const setName = name => dispatch({ type: SET_NAME, name });
    const setText = text => dispatch({ type: SET_TEXT, text });
    const setType = type => dispatch({ type: SET_TYPE, cardType: type });
    const setColors = (color, value) => dispatch({ type: SET_COLORS, color, value });
    const setSet = set => dispatch({ type: SET_SET, set });
    const setPage = page => dispatch({ type: SET_PAGE, page });
    const setTotalResults = totalResults => dispatch({ type: SET_TOTAL_RESULTS, totalResults });
    const setSearchResults = searchResults => dispatch({ type: SET_SEARCH_RESULTS, searchResults });
    const setNumberOfPages = numberOfPages => dispatch({ type: SET_NUMBER_OF_PAGES, numberOfPages });

    const props = {
        ...state,
        setName,
        setText,
        setType,
        setColors,
        setSet,
        setPage,
        setTotalResults,
        setSearchResults,
        setNumberOfPages,
    };

    return <SearchContext.Provider value={props}>{children}</SearchContext.Provider>;
}

export default SearchProvider;
