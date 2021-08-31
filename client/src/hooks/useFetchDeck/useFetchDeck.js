import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';
import useDecks from '../../hooks/useDecks';
import DeckBuilderContext from '../../contexts/DeckBuilder';

export default function useFetchDeck() {
    const { publicID } = useParams();
    const { showMessage } = useMessage();
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
    } = useContext(DeckBuilderContext);

    const fetchDeck = async () => {
        const response = await getDeck(publicID);
        if (!response?.success) {
            if (response?.message) {
                const { text, type } = response?.message;
                showMessage(text, type);
            }

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
        updateUnmodifiedState();
    };

    return {
        fetchDeck,
    };
}
