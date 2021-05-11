import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import useSymbols from '../../hooks/useSymbols';
import DeckBuilderContext, { isDeckUnmodified } from '../../contexts/DeckBuilder';

function Deck({ publicID = '', name = '', size = 0, colors = '', removeDeck = () => {} }) {
    const history = useHistory();
    const { saveDeck } = useDeck();
    const {
        deckPublicID,
        deckName,
        deckVisibility,
        deckCards,
        maybeboardCards,
        unmodifiedDeckName,
        setUnmodifiedDeckName,
        unmodifiedDeckVisibility,
        setUnmodifiedDeckVisibility,
        unmodifiedDeckCards,
        setUnmodifiedDeckCards,
        unmodifiedMaybeboardCards,
        setUnmodifiedMaybeboardCards,
    } = useContext(DeckBuilderContext);
    const isUnmodified = isDeckUnmodified(
        deckName,
        deckVisibility,
        deckCards,
        maybeboardCards,
        unmodifiedDeckName,
        unmodifiedDeckVisibility,
        unmodifiedDeckCards,
        unmodifiedMaybeboardCards
    );

    const onClick = async () => {
        if (!isUnmodified) {
            await saveDeck(deckPublicID, deckName, deckVisibility, deckCards, maybeboardCards);
            setUnmodifiedDeckName();
            setUnmodifiedDeckVisibility();
            setUnmodifiedDeckCards();
            setUnmodifiedMaybeboardCards();
        }

        history.push(`/decks/${publicID}`);
    };

    const onRemoveClick = e => {
        e.preventDefault();
        removeDeck(publicID);
    };

    return (
        <div key={publicID} className='DeckList-deck' onClick={onClick}>
            <div className='DeckList-delete' onClick={onRemoveClick}>
                &#x2715;
            </div>
            <div className='DeckList-deckName'>{name}</div>
            <div className='DeckList-deckSize'>{`${size} cards`}</div>
            <div className='DeckList-deckColors' dangerouslySetInnerHTML={{ __html: useSymbols(colors) }} />
        </div>
    );
}

export default Deck;
