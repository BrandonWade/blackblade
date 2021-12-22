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
    SET_RARITIES,
    SET_FLAVOR_TEXT,
    SET_PAGE,
    SET_TOTAL_RESULTS,
    SET_SEARCH_RESULTS,
    SET_NUMBER_OF_PAGES,
    RESET_SEARCH_CRITERIA,
} from '../../actions/Search';
import { initialState } from '../../contexts/DeckBuilderSearch';

export default function DeckBuilderSearchReducer(state = {}, action = {}) {
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

        case ADD_TYPE:
            return {
                ...state,
                selectedTypes: [
                    ...state.selectedTypes,
                    {
                        type: action.cardType,
                        isNegated: false,
                    },
                ],
            };

        case REMOVE_TYPE: {
            const typeIndex = state.selectedTypes.findIndex(t => t.type === action.cardType);
            return {
                ...state,
                selectedTypes: [...state.selectedTypes.slice(0, typeIndex), ...state.selectedTypes.slice(typeIndex + 1)],
            };
        }

        case NEGATE_TYPE: {
            const typeIndex = state.selectedTypes.findIndex(t => t.type === action.cardType);
            const selectedType = state.selectedTypes[typeIndex];
            return {
                ...state,
                selectedTypes: [
                    ...state.selectedTypes.slice(0, typeIndex),
                    {
                        ...selectedType,
                        isNegated: !selectedType.isNegated,
                    },
                    ...state.selectedTypes.slice(typeIndex + 1),
                ],
            };
        }

        case SET_SELECTED_TYPES:
            return {
                ...state,
                selectedTypes: action.selectedTypes,
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
            const setIndex = state.selectedSets.findIndex(setCode => setCode === action.setCode);
            return {
                ...state,
                selectedSets: [...state.selectedSets.slice(0, setIndex), ...state.selectedSets.slice(setIndex + 1)],
            };

        case SET_SELECTED_SETS:
            return {
                ...state,
                selectedSets: action.selectedSets,
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

        case RESET_SEARCH_CRITERIA:
            return {
                ...initialState,
            };

        default:
            return state;
    }
}
