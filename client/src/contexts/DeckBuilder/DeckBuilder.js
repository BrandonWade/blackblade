import { createContext } from 'react';

export const initialState = {
    deckPublicID: '',
    deckAccountPublicID: '',
    deckName: 'Untitled Deck',
    deckVisibility: 'private',
    deckNotes: '',
    deckCards: [],
    maybeboardCards: [],
    deckLastUpdatedAt: '',
    unmodifiedDeckName: 'Untitled Deck',
    unmodifiedDeckVisibility: 'private',
    unmodifiedDeckNotes: '',
    unmodifiedDeckCards: [],
    unmodifiedMaybeboardCards: [],
    maybeboardMode: false,
    deckExists: false,
    page: 1,
    totalResults: 0,
    searchResults: [],
    numberOfPages: 1,
    selectedTabIndex: 0,
    cardArtSelectorVisible: false,
    isSaving: true,
    isErrored: false,
};

export default createContext(initialState);
