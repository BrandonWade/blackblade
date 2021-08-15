import { createContext } from 'react';
import { isEqual } from 'lodash';

export const initialState = {
    deckPublicID: '',
    deckAccountPublicID: '',
    deckName: 'Untitled Deck',
    deckVisibility: 'private',
    deckNotes: '',
    deckCards: [],
    maybeboardCards: [],
    unmodifiedDeckName: 'Untitled Deck',
    unmodifiedDeckVisibility: 'private',
    unmodifiedDeckNotes: '',
    unmodifiedDeckCards: [],
    unmodifiedMaybeboardCards: [],
    maybeboardMode: false,
    page: 1,
    totalResults: 0,
    searchResults: [],
    numberOfPages: 1,
    selectedTabIndex: 0,
    cardArtSelectorVisible: false,
};

export const isDeckUnmodified = (
    deckName,
    deckVisibility,
    deckNotes,
    deckCards,
    maybeboardCards,
    unmodifiedDeckName,
    unmodifiedDeckVisibility,
    unmodifiedDeckNotes,
    unmodifiedDeckCards,
    unmodifiedMaybeboardCards
) => {
    return (
        isEqual(deckCards, unmodifiedDeckCards) &&
        isEqual(maybeboardCards, unmodifiedMaybeboardCards) &&
        isEqual(deckName, unmodifiedDeckName) &&
        isEqual(deckVisibility, unmodifiedDeckVisibility) &&
        isEqual(deckNotes, unmodifiedDeckNotes)
    );
};

export default createContext(initialState);
