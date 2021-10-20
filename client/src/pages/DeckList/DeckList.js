import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDecks from '../../hooks/useDecks';
import useMessage from '../../hooks/useMessage';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import DeckListContext from '../../contexts/DeckList';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import HeaderPage from '../../components/HeaderPage';
import Deck from './Deck';
import './DeckList.scss';

export default function DeckList() {
    const { listDecks, deleteDeck } = useDecks();
    const { showMessage } = useMessage();
    const { showConfirmDialog } = useConfirmDialog();
    const { deckList, setDeckList } = useContext(DeckListContext);
    const { deckPublicID, resetDeckBuilder } = useContext(DeckBuilderContext);

    useEffect(() => {
        const fetchDeckList = async () => {
            const response = await listDecks();
            if (!response?.success) {
                const { text, type } = response?.message;
                showMessage(text, type);
                return;
            }

            setDeckList(response.decks);
        };

        fetchDeckList();
        resetDeckBuilder();
    }, []);

    const removeDeck = publicID => {
        showConfirmDialog('This will permanently delete your deck and cannot be undone. Are you sure?', () => onConfirmDelete(publicID));
    };

    const onConfirmDelete = async publicID => {
        const response = await deleteDeck(publicID);
        if (!response?.success) {
            const { text, type } = response?.message;
            showMessage(text, type);
            return;
        }

        setDeckList(deckList.filter(d => d.public_id !== publicID));
        if (deckPublicID === publicID) {
            resetDeckBuilder();
        }
    };

    return (
        <HeaderPage className='DeckList'>
            <div className='DeckList-content'>
                <div className='DeckList-list'>
                    <Link to='/decks/new' className='DeckList-deck'>
                        <div className='DeckList-newDeck'>
                            <div className='DeckList-newDeckText'>New Deck</div>
                        </div>
                    </Link>
                    {deckList.map(deck => (
                        <Deck
                            key={deck.public_id}
                            publicID={deck.public_id}
                            name={deck.name}
                            deckSize={deck.deck_size}
                            maybeboardSize={deck.maybeboard_size}
                            colors={deck.colors}
                            removeDeck={removeDeck}
                        />
                    ))}
                </div>
            </div>
        </HeaderPage>
    );
}
