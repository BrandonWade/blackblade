import { createContext } from 'react';

export default createContext({
    deckName: '',
    setDeckName: () => {},
    deckCards: [],
    setDeckCards: () => {},
    unmodifiedDeckCards: [],
    setUnmodifiedDeckCards: () => {},
});
