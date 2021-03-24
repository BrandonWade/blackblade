import { createContext } from 'react';

export const initialState = {
    deckAccountPublicID: '',
    deckName: 'Untitled Deck',
    deckVisibility: 'private',
    deckCards: [],
    maybeboardCards: [],
    unmodifiedDeckName: 'Untitled Deck',
    unmodifiedDeckVisibility: 'private',
    unmodifiedDeckCards: [],
    unmodifiedMaybeboardCards: [],
    maybeboardMode: false,
};

export default createContext(initialState);
