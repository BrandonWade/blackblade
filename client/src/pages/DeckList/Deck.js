import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useDecks from '../../hooks/useDecks';
import useSymbols from '../../hooks/useSymbols';
import DeckBuilderContext, { isDeckUnmodified } from '../../contexts/DeckBuilder';

function Deck({ publicID = '', name = '', deckSize = 0, maybeboardSize = 0, colors = '', removeDeck = () => {} }) {
    const history = useHistory();
    const { saveDeck } = useDecks();
    const {
        deckPublicID,
        deckName,
        deckVisibility,
        deckNotes,
        deckCards,
        maybeboardCards,
        unmodifiedDeckName,
        setUnmodifiedDeckName,
        unmodifiedDeckVisibility,
        setUnmodifiedDeckVisibility,
        unmodifiedDeckNotes,
        setUnmodifiedDeckNotes,
        unmodifiedDeckCards,
        setUnmodifiedDeckCards,
        unmodifiedMaybeboardCards,
        setUnmodifiedMaybeboardCards,
    } = useContext(DeckBuilderContext);
    const isUnmodified = isDeckUnmodified(
        deckName,
        deckVisibility,
        deckNotes,
        deckCards,
        maybeboardCards,
        unmodifiedDeckName,
        unmodifiedDeckVisibility,
        unmodifiedDeckNotes,
        unmodifiedDeckCards,
        unmodifiedMaybeboardCards
    );

    const getSizeText = () => {
        const maybeboardText = maybeboardSize ? ` + ${maybeboardSize}` : '';
        const suffix = deckSize + maybeboardSize === 1 ? ' card' : ' cards';
        return `${deckSize}${maybeboardText} ${suffix}`;
    };

    const onClick = async () => {
        if (!isUnmodified) {
            await saveDeck(deckPublicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards);
            setUnmodifiedDeckName();
            setUnmodifiedDeckVisibility();
            setUnmodifiedDeckNotes();
            setUnmodifiedDeckCards();
            setUnmodifiedMaybeboardCards();
        }

        history.push(`/decks/${publicID}`);
    };

    const onRemoveClick = e => {
        e.stopPropagation();
        removeDeck(publicID);
    };

    return (
        <div key={publicID} className='DeckList-deck' onClick={onClick}>
            <div className='DeckList-delete' onClick={onRemoveClick}>
                &#x2715;
            </div>
            <div className='DeckList-deckName'>{name}</div>
            <div className='DeckList-deckSize'>{getSizeText()}</div>
            <div className='DeckList-deckColors' dangerouslySetInnerHTML={{ __html: useSymbols(colors) }} />
        </div>
    );
}

export default Deck;
