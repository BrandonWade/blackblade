import { useHistory } from 'react-router-dom';
import useSymbols from '../../hooks/useSymbols';

export default function Deck({ publicID = '', name = '', deckSize = 0, maybeboardSize = 0, colors = '', removeDeck = () => {} }) {
    const history = useHistory();
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
