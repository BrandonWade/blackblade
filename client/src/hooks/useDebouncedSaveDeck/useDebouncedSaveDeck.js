import { useCallback } from 'react';
import { debounce } from 'lodash';
import useSaveDeck from '../useSaveDeck';

export default function useDebouncedSaveDeck(delay = 1000) {
    const { saveDeckWithConfirmation } = useSaveDeck();

    return useCallback(
        debounce(async (publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite) => {
            await saveDeckWithConfirmation(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite);
        }, delay),
        []
    );
}
