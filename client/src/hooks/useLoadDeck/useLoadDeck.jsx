import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useDecks from '../../hooks/useDecks';
import DeckBuilderContext from '../../contexts/DeckBuilder';

export default function useLoadDeck() {
    const { publicID } = useParams();
    const { getDeck } = useDecks();
    const {
        setDeckPublicID,
        setDeckAccountPublicID,
        setDeckName,
        setDeckVisibility,
        setDeckNotes,
        setDeckCards,
        setMaybeboardCards,
        updateUnmodifiedState,
        setDeckExists,
        setDeckLastUpdatedAt,
    } = useContext(DeckBuilderContext);

    const loadDeck = async () => {
        const response = await getDeck(publicID);
        if (!response.success) {
            return;
        }

        const deck = response.cards.filter(c => c.location === 'deck');
        const maybeboard = response.cards.filter(c => c.location === 'maybeboard');
        setDeckPublicID(response.deckPublicID);
        setDeckAccountPublicID(response.accountPublicID);
        setDeckName(response.name);
        setDeckVisibility(response.visibility);
        setDeckNotes(response.notes);
        setDeckCards(deck);
        setMaybeboardCards(maybeboard);
        setDeckExists(true);
        setDeckLastUpdatedAt(response.lastUpdatedAt);
        updateUnmodifiedState();
    };

    return {
        loadDeck,
    };
}
