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
    SET_RARITIES,
    SET_FLAVOR_TEXT,
    SET_PAGE,
    SET_TOTAL_RESULTS,
    SET_SEARCH_RESULTS,
    SET_NUMBER_OF_PAGES,
} from '../../actions/Search';

function SearchReducer(state = {}, action = {}) {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.name,
            };

        case SET_TEXT:
            return {
                ...state,
                text: action.text,
            };

        case SET_TYPE:
            return {
                ...state,
                types: action.types,
            };

        case SET_COLORS:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    [action.color]: action.value,
                    colorless: false,
                },
            };

        case SET_COLORLESS:
            return {
                ...state,
                colors: {
                    white: false,
                    blue: false,
                    black: false,
                    red: false,
                    green: false,
                    colorless: action.value,
                },
            };

        case SET_MATCH_TYPE:
            return {
                ...state,
                matchType: action.matchType,
            };

        case ADD_SET:
            return {
                ...state,
                selectedSets: [...state.selectedSets, action.set],
            };

        case REMOVE_SET:
            const setIndex = state.selectedSets.findIndex(set => set.set_code === action.setCode);
            return {
                ...state,
                selectedSets: [...state.selectedSets.slice(0, setIndex), ...state.selectedSets.slice(setIndex + 1)],
            };

        case SET_STAT:
            return {
                ...state,
                [action.stat]: {
                    comparator: action.comparator,
                    value: action.value,
                },
            };

        case SET_RARITIES:
            return {
                ...state,
                rarities: {
                    ...state.rarities,
                    [action.rarity]: action.value,
                },
            };

        case SET_FLAVOR_TEXT:
            return {
                ...state,
                flavorText: action.flavorText,
            };

        case SET_PAGE:
            return {
                ...state,
                page: action.page,
            };

        case SET_TOTAL_RESULTS:
            return {
                ...state,
                totalResults: action.totalResults,
            };

        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.searchResults,
            };

        case SET_NUMBER_OF_PAGES:
            return {
                ...state,
                numberOfPages: action.numberOfPages,
            };

        default:
            return state;
    }
}

export default SearchReducer;
