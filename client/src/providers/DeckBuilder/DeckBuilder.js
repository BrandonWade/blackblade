import React, { useReducer } from 'react';
import DeckBuilderReducer from '../../reducers/DeckBuilder';
import DeckBuilderContext, { initialState } from '../../contexts/DeckBuilder';

function DeckBuilderProvider({ children = [] }) {
    const [state, dispatch] = useReducer(DeckBuilderReducer, initialState);

    const setDeckName = deckName => dispatch({ type: 'SET_DECK_NAME', deckName });
    const setDeckCards = deckCards => dispatch({ type: 'SET_DECK_CARDS', deckCards });
    const setMaybeboardCards = maybeboardCards => dispatch({ type: 'SET_MAYBEBOARD_CARDS', maybeboardCards });
    const setUnmodifiedDeckName = unmodifiedDeckName => dispatch({ type: 'SET_UNMODIFIED_DECK_NAME', unmodifiedDeckName });
    const setUnmodifiedDeckCards = unmodifiedDeckCards => dispatch({ type: 'SET_UNMODIFIED_DECK_CARDS', unmodifiedDeckCards });
    const setUnmodifiedMaybeboardCards = unmodifiedMaybeboardCards => dispatch({ type: 'SET_UNMODIFIED_MAYBEBOARD_CARDS', unmodifiedMaybeboardCards });
    const setMaybeboardMode = maybeboardMode => dispatch({ type: 'SET_MAYBEBOARD_MODE', maybeboardMode });

    const props = {
        ...state,
        setDeckName,
        setDeckCards,
        setMaybeboardCards,
        setUnmodifiedDeckName,
        setUnmodifiedDeckCards,
        setUnmodifiedMaybeboardCards,
        setMaybeboardMode,
    };

    return <DeckBuilderContext.Provider value={props}>{children}</DeckBuilderContext.Provider>;
}

export default DeckBuilderProvider;
