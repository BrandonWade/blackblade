import { createContext } from 'react';

export const initialState = {
    deckName: '',
    deckVisibility: '',
    deckCards: [],
    maybeboardCards: [],
    unmodifiedDeckName: '',
    unmodifiedDeckVisibility: '',
    unmodifiedDeckCards: [],
    unmodifiedMaybeboardCards: [],
    maybeboardMode: false,
};

export default createContext(initialState);
