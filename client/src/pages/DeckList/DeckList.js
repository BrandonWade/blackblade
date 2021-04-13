import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import DeckListContext from '../../contexts/DeckList';
import HeaderPage from '../../components/HeaderPage';
import Deck from './Deck';
import './DeckList.scss';

function DeckList() {
    const { listDecks } = useDeck();
    const { deckList, setDeckList } = useContext(DeckListContext);

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

    const removeDeck = publicID => {
        setDeckList(deckList.filter(d => d.public_id !== publicID));
    };

    return (
        <HeaderPage className='DeckList'>
            <div className='DeckList-content'>
                <div className='DeckList-list'>
                    <Link to='/decks/new' className='DeckList-deck'>
                        <div className='DeckList-newDeck'>
                            <div>New Deck</div>
                        </div>
                    </Link>
                    {deckList.map(deck => (
                        <Deck publicID={deck.public_id} name={deck.name} size={deck.size} colors={deck.colors} removeDeck={removeDeck} />
                    ))}
                </div>
            </div>
        </HeaderPage>
    );
}

export default DeckList;
