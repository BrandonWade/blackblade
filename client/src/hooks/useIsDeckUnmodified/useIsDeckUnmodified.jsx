import { useContext } from 'react';
import { isEqual } from 'lodash';
import DeckBuilderContext from '../../contexts/DeckBuilder';

export default function useIsDeckUnmodified() {
    const {
        deckName,
        deckVisibility,
        deckNotes,
        deckCards,
        maybeboardCards,
        unmodifiedDeckName,
        unmodifiedDeckVisibility,
        unmodifiedDeckNotes,
        unmodifiedDeckCards,
        unmodifiedMaybeboardCards,
    } = useContext(DeckBuilderContext);

    const isDeckUnmodified = () => {
        return (
            isEqual(deckCards, unmodifiedDeckCards) &&
            isEqual(maybeboardCards, unmodifiedMaybeboardCards) &&
            isEqual(deckName, unmodifiedDeckName) &&
            isEqual(deckVisibility, unmodifiedDeckVisibility) &&
            isEqual(deckNotes, unmodifiedDeckNotes)
        );
    };

    return {
        isDeckUnmodified,
    };
}
