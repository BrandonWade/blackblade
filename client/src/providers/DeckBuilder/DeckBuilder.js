import { useReducer } from 'react';
import DeckBuilderReducer from '../../reducers/DeckBuilder';
import DeckBuilderContext, { initialState } from '../../contexts/DeckBuilder';
import {
    SET_DECK_NAME,
    SET_DECK_CARDS,
    UPDATE_DECK_CARD_COUNT,
    REMOVE_DECK_CARD,
    SET_MAYBEBOARD_CARDS,
    UPDATE_MAYBEBOARD_CARD_COUNT,
    REMOVE_MAYBEBOARD_CARD,
    SET_UNMODIFIED_DECK_NAME,
    SET_UNMODIFIED_DECK_CARDS,
    SET_UNMODIFIED_MAYBEBOARD_CARDS,
    SET_MAYBEBOARD_MODE,
    MOVE_TO_DECK,
    MOVE_TO_MAYBEBOARD,
} from '../../actions/DeckBuilder';

function DeckBuilderProvider({ children = [] }) {
    const [state, dispatch] = useReducer(DeckBuilderReducer, initialState);

    const setDeckName = deckName => dispatch({ type: SET_DECK_NAME, deckName });
    const setDeckCards = deckCards => dispatch({ type: SET_DECK_CARDS, deckCards });
    const updateDeckCardCount = (cardID, count) => dispatch({ type: UPDATE_DECK_CARD_COUNT, cardID, count });
    const removeDeckCard = cardID => dispatch({ type: REMOVE_DECK_CARD, cardID });
    const setMaybeboardCards = maybeboardCards => dispatch({ type: SET_MAYBEBOARD_CARDS, maybeboardCards });
    const updateMaybeboardCardCount = (cardID, count) => dispatch({ type: UPDATE_MAYBEBOARD_CARD_COUNT, cardID, count });
    const removeMaybeboardCard = cardID => dispatch({ type: REMOVE_MAYBEBOARD_CARD, cardID });
    const setUnmodifiedDeckName = () => dispatch({ type: SET_UNMODIFIED_DECK_NAME });
    const setUnmodifiedDeckCards = () => dispatch({ type: SET_UNMODIFIED_DECK_CARDS });
    const setUnmodifiedMaybeboardCards = () => dispatch({ type: SET_UNMODIFIED_MAYBEBOARD_CARDS });
    const setMaybeboardMode = maybeboardMode => dispatch({ type: SET_MAYBEBOARD_MODE, maybeboardMode });
    const moveToDeck = (cardID, count) => dispatch({ type: MOVE_TO_DECK, cardID, count });
    const moveToMaybeboard = (cardID, count) => dispatch({ type: MOVE_TO_MAYBEBOARD, cardID, count });

    const props = {
        ...state,
        setDeckName,
        setDeckCards,
        updateDeckCardCount,
        removeDeckCard,
        setMaybeboardCards,
        updateMaybeboardCardCount,
        removeMaybeboardCard,
        setUnmodifiedDeckName,
        setUnmodifiedDeckCards,
        setUnmodifiedMaybeboardCards,
        setMaybeboardMode,
        moveToDeck,
        moveToMaybeboard,
    };

    return <DeckBuilderContext.Provider value={props}>{children}</DeckBuilderContext.Provider>;
}

export default DeckBuilderProvider;
