import { useState } from 'react';
import DeckListContext, { initialState } from '../../contexts/DeckList';

function DeckListProvider({ children = [] }) {
    const [deckList, setDeckList] = useState(initialState);

    const props = {
        deckList,
        setDeckList,
    };

    return <DeckListContext.Provider value={props}>{children}</DeckListContext.Provider>;
}

export default DeckListProvider;
