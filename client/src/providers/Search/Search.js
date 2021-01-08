import React, { useReducer } from 'react';
import SearchReducer from '../../reducers/Search';
import SearchContext, { initialState } from '../../contexts/Search';
import {
    SET_NAME,
    SET_TEXT,
    SET_TYPE,
    SET_COLORS,
    SET_COLORLESS,
    SET_MATCH_TYPE,
    ADD_SET,
    REMOVE_SET,
    SET_STAT,
    SET_FLAVOR_TEXT,
    SET_RARITIES,
    SET_PAGE,
    SET_TOTAL_RESULTS,
    SET_SEARCH_RESULTS,
    SET_NUMBER_OF_PAGES,
} from '../../actions/Search';

function SearchProvider({ children = [] }) {
    const [state, dispatch] = useReducer(SearchReducer, initialState);

    const setName = name => dispatch({ type: SET_NAME, name });
    const setText = text => dispatch({ type: SET_TEXT, text });
    const setTypes = types => dispatch({ type: SET_TYPE, types });
    const setColors = (color, value) => dispatch({ type: SET_COLORS, color, value });
    const setColorless = value => dispatch({ type: SET_COLORLESS, value });
    const setMatchType = matchType => dispatch({ type: SET_MATCH_TYPE, matchType });
    const addSet = set => dispatch({ type: ADD_SET, set });
    const removeSet = set => dispatch({ type: REMOVE_SET, set });
    const setStat = (stat, comparator, value) => dispatch({ type: SET_STAT, stat, comparator, value });
    const setRarities = (rarity, value) => dispatch({ type: SET_RARITIES, rarity, value });
    const setFlavorText = flavorText => dispatch({ type: SET_FLAVOR_TEXT, flavorText });
    const setPage = page => dispatch({ type: SET_PAGE, page });
    const setTotalResults = totalResults => dispatch({ type: SET_TOTAL_RESULTS, totalResults });
    const setSearchResults = searchResults => dispatch({ type: SET_SEARCH_RESULTS, searchResults });
    const setNumberOfPages = numberOfPages => dispatch({ type: SET_NUMBER_OF_PAGES, numberOfPages });

    const props = {
        ...state,
        setName,
        setText,
        setTypes,
        setColors,
        setColorless,
        setMatchType,
        addSet,
        removeSet,
        setStat,
        setRarities,
        setFlavorText,
        setPage,
        setTotalResults,
        setSearchResults,
        setNumberOfPages,
    };

    return <SearchContext.Provider value={props}>{children}</SearchContext.Provider>;
}

export default SearchProvider;
