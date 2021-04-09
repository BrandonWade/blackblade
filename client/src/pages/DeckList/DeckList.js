import { useContext } from 'react';
import DeckListContext from '../../contexts/DeckList';
import HeaderPage from '../../components/HeaderPage';
import Deck from './Deck';
import './DeckList.scss';

function DeckList() {
    const { deckList, setDeckList } = useContext(DeckListContext);

    const removeDeck = publicID => {
        setDeckList(deckList.filter(d => d.public_id !== publicID));
    };

    return (
        <HeaderPage className='DeckList'>
            <div className='DeckList-content'>
                <div className='DeckList-list'>
                    {deckList.map(deck => (
                        <Deck publicID={deck.public_id} name={deck.name} size={deck.size} colors={{}} removeDeck={removeDeck} />
                    ))}
                </div>
            </div>
        </HeaderPage>
    );
}

export default DeckList;
