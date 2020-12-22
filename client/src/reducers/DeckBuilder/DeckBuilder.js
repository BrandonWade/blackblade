function DeckBuilderReducer(state = {}, action = {}) {
    switch (action.type) {
        case 'SET_DECK_NAME':
            return {
                ...state,
                deckName: action.deckName,
            };

        case 'SET_DECK_CARDS':
            return {
                ...state,
                deckCards: action.deckCards,
            };

        case 'SET_MAYBEBOARD_CARDS':
            return {
                ...state,
                maybeboardCards: action.maybeboardCards,
            };

        case 'SET_UNMODIFIED_DECK_NAME':
            return {
                ...state,
                unmodifiedDeckName: action.unmodifiedDeckName,
            };

        case 'SET_UNMODIFIED_DECK_CARDS':
            return {
                ...state,
                unmodifiedDeckCards: action.unmodifiedDeckCards,
            };

        case 'SET_UNMODIFIED_MAYBEBOARD_CARDS':
            return {
                ...state,
                unmodifiedMaybeboardCards: action.unmodifiedMaybeboardCards,
            };

        case 'SET_MAYBEBOARD_MODE':
            return {
                ...state,
                maybeboardMode: action.maybeboardMode,
            };

        default:
            return state;
    }
}

export default DeckBuilderReducer;
