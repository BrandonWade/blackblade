import { useReducer } from 'react';
import DeckBuilderSearchReducer from '../../reducers/DeckBuilderSearch';
import DeckBuilderSearchContext, { initialState } from '../../contexts/DeckBuilderSearch';
import {
    SET_NAME,
    SET_TEXT,
    ADD_TYPE,
    REMOVE_TYPE,
    NEGATE_TYPE,
    SET_SELECTED_TYPES,
    SET_COLORS,
    SET_COLORLESS,
    SET_MATCH_TYPE,
    ADD_SET,
    REMOVE_SET,
    SET_SELECTED_SETS,
    SET_STAT,
    SET_FLAVOR_TEXT,
    SET_RARITIES,
    SET_PAGE,
    SET_TOTAL_RESULTS,
    SET_SEARCH_RESULTS,
    SET_NUMBER_OF_PAGES,
    RESET_SEARCH_CRITERIA,
} from '../../actions/Search';

export default function DeckBuilderSearchProvider({ children = [] }) {
    const [state, dispatch] = useReducer(DeckBuilderSearchReducer, initialState);

    const setName = name => dispatch({ type: SET_NAME, name });
    const setText = text => dispatch({ type: SET_TEXT, text });
    const addType = cardType => dispatch({ type: ADD_TYPE, cardType });
    const removeType = cardType => dispatch({ type: REMOVE_TYPE, cardType });
    const negateType = cardType => dispatch({ type: NEGATE_TYPE, cardType });
    const setSelectedTypes = selectedTypes => dispatch({ type: SET_SELECTED_TYPES, selectedTypes });
    const setColors = (color, value) => dispatch({ type: SET_COLORS, color, value });
    const setColorless = value => dispatch({ type: SET_COLORLESS, value });
    const setMatchType = matchType => dispatch({ type: SET_MATCH_TYPE, matchType });
    const addSet = set => dispatch({ type: ADD_SET, set });
    const removeSet = setCode => dispatch({ type: REMOVE_SET, setCode });
    const setSelectedSets = selectedSets => dispatch({ type: SET_SELECTED_SETS, selectedSets });
    const setStat = (stat, comparator, value) => dispatch({ type: SET_STAT, stat, comparator, value });
    const setRarities = (rarity, value) => dispatch({ type: SET_RARITIES, rarity, value });
    const setFlavorText = flavorText => dispatch({ type: SET_FLAVOR_TEXT, flavorText });
    const setPage = page => dispatch({ type: SET_PAGE, page });
    const setTotalResults = totalResults => dispatch({ type: SET_TOTAL_RESULTS, totalResults });
    const setSearchResults = searchResults => dispatch({ type: SET_SEARCH_RESULTS, searchResults });
    const setNumberOfPages = numberOfPages => dispatch({ type: SET_NUMBER_OF_PAGES, numberOfPages });
    const resetSearchCriteria = () => dispatch({ type: RESET_SEARCH_CRITERIA });

    const props = {
        ...state,
        setName,
        setText,
        addType,
        removeType,
        negateType,
        setSelectedTypes,
        setColors,
        setColorless,
        setMatchType,
        addSet,
        removeSet,
        setSelectedSets,
        setStat,
        setRarities,
        setFlavorText,
        setPage,
        setTotalResults,
        setSearchResults,
        setNumberOfPages,
        resetSearchCriteria,
    };

    return <DeckBuilderSearchContext.Provider value={props}>{children}</DeckBuilderSearchContext.Provider>;
}
