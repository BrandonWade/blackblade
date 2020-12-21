import { createContext } from 'react';

export default createContext({
    deckName: '',
    setDeckName: () => {},
    deckCards: [],
    setDeckCards: () => {},
    maybeboardCards: [],
    setMaybeboardCards: () => {},
    unmodifiedDeckName: '',
    setUnmodifiedDeckName: () => {},
    unmodifiedDeckCards: [],
    setUnmodifiedDeckCards: () => {},
    unmodifiedMaybeboardCards: [],
    setUnmodifiedMaybeboardCards: () => {},
    maybeboardMode: false,
    setMaybeboardMode: () => {},
});
