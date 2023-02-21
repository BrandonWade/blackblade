import { useContext } from 'react';
import useDecks from '../useDecks';
import useConfirmDialog from '../useConfirmDialog';
import DeckBuilderContext from '../../contexts/DeckBuilder';

export default function usePersistDeck() {
    const { saveDeck } = useDecks();
    const { showConfirmDialog } = useConfirmDialog();
    const { setDeckLastUpdatedAt, setIsSaving, setIsErrored, updateUnmodifiedState } = useContext(DeckBuilderContext);

    async function makeSaveRequest(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite) {
        setIsSaving();

        const response = await saveDeck(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, overwrite);
        if (response.success) {
            setDeckLastUpdatedAt(response.lastUpdatedAt);
            updateUnmodifiedState();
        } else {
            setIsErrored();
        }

        return response;
    }

    const persistDeckWithConfirmation = async (
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
        persistDeckWithConfirmation,
    };
}
