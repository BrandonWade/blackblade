import { useCallback, useContext } from 'react';
import { debounce } from 'lodash';
import useDecks from '../../hooks/useDecks';
import DeckBuilderContext from '../../contexts/DeckBuilder';

export default function useDebouncedSaveDeck(delay = 1000) {
    const { saveDeck } = useDecks();
    const { setDeckLastUpdatedAt, updateUnmodifiedState } = useContext(DeckBuilderContext);

    return useCallback(
        debounce(async (publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite) => {
            const response = await saveDeck(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite);
            if (!response.success) {
                return;
            }

            // Once changes to the deck have been saved, update the unmodified state
            setDeckLastUpdatedAt(response.lastUpdatedAt);
            updateUnmodifiedState();
        }, delay),
        []
    );
}
