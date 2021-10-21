import { useContext } from 'react';
import useDecks from '../useDecks';
import useConfirmDialog from '../useConfirmDialog';
import DeckBuilderContext from '../../contexts/DeckBuilder';

export default function useSaveDeck() {
    const { saveDeck } = useDecks();
    const { showConfirmDialog } = useConfirmDialog();
    const { setDeckLastUpdatedAt, updateUnmodifiedState } = useContext(DeckBuilderContext);

    async function makeSaveRequest(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite) {
        const response = await saveDeck(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite);
        if (response.success) {
            setDeckLastUpdatedAt(response.lastUpdatedAt);
            updateUnmodifiedState();
        }

        return response;
    }

    const saveDeckWithConfirmation = async (
        publicID = '',
        deckName = '',
        deckVisibility = 'private',
        deckNotes = '',
        deckCards = [],
        maybeboardCards = [],
        deckLastUpdatedAt = '',
        overwrite = false
    ) => {
        const response = await makeSaveRequest(
            publicID,
            deckName,
            deckVisibility,
            deckNotes,
            deckCards,
            maybeboardCards,
            deckLastUpdatedAt,
            overwrite
        );
        if (response.confirmation) {
            showConfirmDialog('A newer version of this deck has already been saved. Would you like to overwrite it with your changes?', () =>
                makeSaveRequest(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, true)
            );
        }

        return;
    };

    return {
        saveDeckWithConfirmation,
    };
}
