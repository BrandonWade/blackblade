import { Link } from 'react-router-dom';
import useSymbols from '../../hooks/useSymbols';

function Deck({ publicID = '', name = '', size = 0, colors = '', removeDeck = () => {} }) {
    const onRemoveClick = e => {
        e.preventDefault();
        removeDeck(publicID);
    };

    return (
        <Link to={`/decks/${publicID}`}>
            <div key={publicID} className='DeckList-deck'>
                <div className='DeckList-delete' onClick={onRemoveClick}>
                    &#x2715;
                </div>
                <div className='DeckList-deckName'>{name}</div>
                <div className='DeckList-deckSize'>{`${size} cards`}</div>
                <div className='DeckList-deckColors' dangerouslySetInnerHTML={{ __html: useSymbols(colors) }} />
            </div>
        </Link>
    );
}

export default Deck;
