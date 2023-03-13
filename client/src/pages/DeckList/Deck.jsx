import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useSymbols from '../../hooks/useSymbols';
import LoadingSkeleton from '../../components/LoadingSkeleton';

function Deck({ loading = false, publicID = '', name = '', deckSize = 0, maybeboardSize = 0, colors = '', removeDeck = () => {} }) {
    const history = useHistory();

    if (loading) {
        return <LoadingSkeleton className='DeckList-deck--loading' />;
    }

    const getSizeText = () => {
        const maybeboardText = maybeboardSize ? ` + ${maybeboardSize}` : '';
        const suffix = deckSize + maybeboardSize === 1 ? ' card' : ' cards';
        return `${deckSize}${maybeboardText} ${suffix}`;
    };

    const onClick = () => {
        history.push(`/decks/${publicID}`);
    };

    const onRemoveClick = e => {
        e.stopPropagation();
        removeDeck(publicID);
    };

    return (
        <div className='DeckList-deck' onClick={onClick}>
            <div className='DeckList-delete' onClick={onRemoveClick}>
                &#x2715;
            </div>
            <div className='DeckList-deckName'>{name}</div>
            <div className='DeckList-deckSize'>{getSizeText()}</div>
            <div className='DeckList-deckColors' dangerouslySetInnerHTML={{ __html: useSymbols(colors) }} />
        </div>
    );
}

Deck.propTypes = {
    loading: PropTypes.bool,
    publicID: PropTypes.string,
    name: PropTypes.string,
    deckSize: PropTypes.number,
    maybeboardSize: PropTypes.number,
    colors: PropTypes.string,
    removeDeck: PropTypes.func,
};

export default Deck;
