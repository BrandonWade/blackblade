import { useContext } from 'react';
import CardArtSelectorContext from '../../contexts/CardArtSelector';
import CardContext from '../../contexts/Card';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import Backdrop from '../Backdrop';
import CloseButton from '../CloseButton';
import CardGrid from '../CardGrid';
import './CardArtSelector.scss';

function CardArtSelector() {
    const { artSelectorVisible, setArtSelectorVisible } = useContext(CardArtSelectorContext);
    const { card, setCard } = useContext(CardContext);
    const { deckCards, setDeckCards, maybeboardCards, setMaybeboardCards } = useContext(DeckBuilderContext);
    const inDeck = card.location === 'deck';
    const sets = card.sets_json || [];

    const onClose = () => setArtSelectorVisible(false);

    const onSelectCard = cardVariant => {
        const cardList = inDeck ? deckCards : maybeboardCards;
        const updateCardList = inDeck ? setDeckCards : setMaybeboardCards;
        const index = cardList.findIndex(c => c.card_id === card.card_id);
        const updatedCard = {
            ...cardList[index],
            ...cardVariant,
            selection_type: 'manual',
        };
        const cards = [...cardList.slice(0, index), updatedCard, ...cardList.slice(index + 1)];
        setCard(updatedCard);
        updateCardList(cards);
        setArtSelectorVisible(false);
    };

    return (
        <Backdrop visible={artSelectorVisible} onClose={onClose}>
            <div className='CardArtSelector'>
                <CloseButton className='CardArtSelector-closeButton' onClose={setArtSelectorVisible} />
                <CardGrid className='CardArtSelector-cardGrid' cards={sets} currentCardID={card.card_id} onClick={onSelectCard} />
            </div>
        </Backdrop>
    );
}

export default CardArtSelector;
