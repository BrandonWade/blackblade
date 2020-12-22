import { createContext } from 'react';

export const initialState = {
    deckName: '',
    deckCards: [],
    maybeboardCards: [],
    unmodifiedDeckName: '',
    unmodifiedDeckCards: [],
    unmodifiedMaybeboardCards: [],
    maybeboardMode: false,
};

export default createContext(initialState);
