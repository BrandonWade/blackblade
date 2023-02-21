import { useCallback } from 'react';
import { debounce } from 'lodash';
import usePersistDeck from '../usePersistDeck';

export default function useDebouncedPersistDeck(delay = 1000) {
    const { persistDeckWithConfirmation } = usePersistDeck();

    return useCallback(
        debounce(async (publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite) => {
            await persistDeckWithConfirmation(
                publicID,
                deckName,
                deckVisibility,
                deckNotes,
                deckCards,
                maybeboardCards,
                deckLastUpdatedAt,
                overwrite
            );
        }, delay),
        []
    );
}
