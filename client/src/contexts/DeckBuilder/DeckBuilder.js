import { createContext } from 'react';
import { isEqual } from 'lodash';

export const initialState = {
    deckPublicID: '',
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
    page: 1,
    totalResults: 0,
    searchResults: [],
    numberOfPages: 1,
};

export const isDeckUnmodified = (
    deckName,
    deckVisibility,
    deckCards,
    maybeboardCards,
    unmodifiedDeckName,
    unmodifiedDeckVisibility,
    unmodifiedDeckCards,
    unmodifiedMaybeboardCards
) => {
    return (
        isEqual(deckCards, unmodifiedDeckCards) &&
        isEqual(maybeboardCards, unmodifiedMaybeboardCards) &&
        isEqual(deckName, unmodifiedDeckName) &&
        isEqual(deckVisibility, unmodifiedDeckVisibility)
    );
};

export default createContext(initialState);
