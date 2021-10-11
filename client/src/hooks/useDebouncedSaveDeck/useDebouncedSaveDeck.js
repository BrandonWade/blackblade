import { useCallback, useContext } from 'react';
import { debounce } from 'lodash';
import useMessage from '../../hooks/useMessage';
import useDecks from '../../hooks/useDecks';
import DeckBuilderContext from '../../contexts/DeckBuilder';

export default function useDebouncedSaveDeck(delay = 1000) {
    const { showMessage } = useMessage();
    const { saveDeck } = useDecks();
    const { updateUnmodifiedState } = useContext(DeckBuilderContext);

    return useCallback(
        debounce(async (publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite) => {
            const response = await saveDeck(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite);
            if (!response?.success) {
                if (response?.message) {
                    const { text, type } = response?.message;
                    showMessage(text, type);
                }

                return;
            }

            // Once changes to the deck have been saved, update the unmodified state
            updateUnmodifiedState();
        }, delay),
        []
    );
}
