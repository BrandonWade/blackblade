import { createContext } from 'react';

export default createContext({
    deckName: 'Untitled Deck',
    setDeckName: () => {},
    deckCards: [],
    setDeckCards: () => {},
});
