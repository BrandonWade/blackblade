import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import DeckListContext from '../../contexts/DeckList';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import HeaderPage from '../../components/HeaderPage';
import ConfirmDialog from '../../components/ConfirmDialog';
import Deck from './Deck';
import './DeckList.scss';

function DeckList() {
    const [deckPublicIDToDelete, setDeckPublicIDToDelete] = useState(null);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const { listDecks, deleteDeck } = useDeck();
    const { deckList, setDeckList } = useContext(DeckListContext);
    const { deckPublicID, resetDeckBuilder } = useContext(DeckBuilderContext);

    useEffect(() => {
        const fetchDeckList = async () => {
            const result = await listDecks();
            if (!result.success) {
                return;
            }

            setDeckList(result.decks);
        };

        fetchDeckList();
    }, []);

    const removeDeck = async publicID => {
        setDeckPublicIDToDelete(publicID);
        setDeleteDialogVisible(true);
    };

    const onCancelDelete = () => {
        setDeckPublicIDToDelete(null);
    };

    const onConfirmDelete = async () => {
        const result = await deleteDeck(deckPublicIDToDelete);
        if (!result.success) {
            return;
        }

        setDeckList(deckList.filter(d => d.public_id !== deckPublicIDToDelete));
        if (deckPublicID === deckPublicIDToDelete) {
            resetDeckBuilder();
        }
    };

    return (
        <HeaderPage className='DeckList'>
            <ConfirmDialog
                message='This will permanently delete your deck and cannot be undone. Are you sure?'
                visible={deleteDialogVisible}
                onCancel={onCancelDelete}
                onConfirm={onConfirmDelete}
                setVisible={setDeleteDialogVisible}
            />
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
                            size={deck.size}
                            colors={deck.colors}
                            removeDeck={removeDeck}
                        />
                    ))}
                </div>
            </div>
        </HeaderPage>
    );
}

export default DeckList;
