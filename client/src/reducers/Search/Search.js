function SearchReducer(state = {}, action = {}) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name,
            };

        case 'SET_TEXT':
            return {
                ...state,
                text: action.text,
            };

        case 'SET_TYPE':
            return {
                ...state,
                type: action.cardType,
            };

        case 'SET_COLORS':
            return {
                ...state,
                colors: {
                    ...state.colors,
                    [action.color]: !state.colors[action.color],
                },
            };

        case 'SET_SET':
            return {
                ...state,
                set: action.set,
            };

        case 'SET_PAGE':
            return {
                ...state,
                page: action.page,
            };

        case 'SET_TOTAL_RESULTS':
            return {
                ...state,
                totalResults: action.totalResults,
            };

        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.searchResults,
            };

        case 'SET_NUMBER_OF_PAGES':
            return {
                ...state,
                numberOfPages: action.numberOfPages,
            };

        default:
            return state;
    }
}

export default SearchReducer;
