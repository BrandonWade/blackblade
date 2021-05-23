import { useReducer } from 'react';
import DeckBuilderReducer from '../../reducers/DeckBuilder';
import DeckBuilderContext, { initialState } from '../../contexts/DeckBuilder';
import {
    SET_DECK_PUBLIC_ID,
    SET_DECK_ACCOUNT_PUBLIC_ID,
    SET_DECK_NAME,
    SET_DECK_VISIBILITY,
    SET_DECK_CARDS,
    UPDATE_DECK_CARD_COUNT,
    REMOVE_DECK_CARD,
    SET_MAYBEBOARD_CARDS,
    UPDATE_MAYBEBOARD_CARD_COUNT,
    REMOVE_MAYBEBOARD_CARD,
    SET_UNMODIFIED_DECK_NAME,
    SET_UNMODIFIED_DECK_VISIBILITY,
    SET_UNMODIFIED_DECK_CARDS,
    SET_UNMODIFIED_MAYBEBOARD_CARDS,
    SET_MAYBEBOARD_MODE,
    SET_NAME,
    SET_PAGE,
    SET_TOTAL_RESULTS,
    SET_SEARCH_RESULTS,
    SET_NUMBER_OF_PAGES,
    MOVE_TO_DECK,
    MOVE_TO_MAYBEBOARD,
    RESET_DECK_BUILDER,
} from '../../actions/DeckBuilder';

function DeckBuilderProvider({ children = [] }) {
    const [state, dispatch] = useReducer(DeckBuilderReducer, initialState);

    const setDeckPublicID = deckPublicID => dispatch({ type: SET_DECK_PUBLIC_ID, deckPublicID });
    const setDeckAccountPublicID = deckAccountPublicID => dispatch({ type: SET_DECK_ACCOUNT_PUBLIC_ID, deckAccountPublicID });
    const setDeckName = deckName => dispatch({ type: SET_DECK_NAME, deckName });
    const setDeckVisibility = deckVisibility => dispatch({ type: SET_DECK_VISIBILITY, deckVisibility });
    const setDeckCards = deckCards => dispatch({ type: SET_DECK_CARDS, deckCards });
    const updateDeckCardCount = (cardID, count) => dispatch({ type: UPDATE_DECK_CARD_COUNT, cardID, count });
    const removeDeckCard = cardID => dispatch({ type: REMOVE_DECK_CARD, cardID });
    const setMaybeboardCards = maybeboardCards => dispatch({ type: SET_MAYBEBOARD_CARDS, maybeboardCards });
    const updateMaybeboardCardCount = (cardID, count) => dispatch({ type: UPDATE_MAYBEBOARD_CARD_COUNT, cardID, count });
    const removeMaybeboardCard = cardID => dispatch({ type: REMOVE_MAYBEBOARD_CARD, cardID });
    const setUnmodifiedDeckName = () => dispatch({ type: SET_UNMODIFIED_DECK_NAME });
    const setUnmodifiedDeckVisibility = () => dispatch({ type: SET_UNMODIFIED_DECK_VISIBILITY });
    const setUnmodifiedDeckCards = () => dispatch({ type: SET_UNMODIFIED_DECK_CARDS });
    const setUnmodifiedMaybeboardCards = () => dispatch({ type: SET_UNMODIFIED_MAYBEBOARD_CARDS });
    const setMaybeboardMode = maybeboardMode => dispatch({ type: SET_MAYBEBOARD_MODE, maybeboardMode });
    const setName = name => dispatch({ type: SET_NAME, name });
    const setPage = page => dispatch({ type: SET_PAGE, page });
    const setTotalResults = totalResults => dispatch({ type: SET_TOTAL_RESULTS, totalResults });
    const setSearchResults = searchResults => dispatch({ type: SET_SEARCH_RESULTS, searchResults });
    const setNumberOfPages = numberOfPages => dispatch({ type: SET_NUMBER_OF_PAGES, numberOfPages });
    const moveToDeck = (cardID, count) => dispatch({ type: MOVE_TO_DECK, cardID, count });
    const moveToMaybeboard = (cardID, count) => dispatch({ type: MOVE_TO_MAYBEBOARD, cardID, count });
    const resetDeckBuilder = () => dispatch({ type: RESET_DECK_BUILDER });

    const props = {
        ...state,
        setDeckPublicID,
        setDeckAccountPublicID,
        setDeckName,
        setDeckVisibility,
        setDeckCards,
        updateDeckCardCount,
        removeDeckCard,
        setMaybeboardCards,
        updateMaybeboardCardCount,
        removeMaybeboardCard,
        setUnmodifiedDeckName,
        setUnmodifiedDeckVisibility,
        setUnmodifiedDeckCards,
        setUnmodifiedMaybeboardCards,
        setMaybeboardMode,
        setName,
        setPage,
        setTotalResults,
        setSearchResults,
        setNumberOfPages,
        moveToDeck,
        moveToMaybeboard,
        resetDeckBuilder,
    };

    return <DeckBuilderContext.Provider value={props}>{children}</DeckBuilderContext.Provider>;
}

export default DeckBuilderProvider;
