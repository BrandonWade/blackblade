import { useContext } from 'react';
import CardArtSelectorContext from '../../contexts/CardArtSelector';
import CardContext from '../../contexts/Card';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import Backdrop from '../Backdrop';
import XButton from '../XButton';
import CardGrid from '../CardGrid';
import './CardArtSelector.scss';

function CardArtSelector() {
    const { artSelectorVisible, setArtSelectorVisible } = useContext(CardArtSelectorContext);
    const { card, setCard } = useContext(CardContext);
    const { deckCards, setDeckCards, maybeboardCards, setMaybeboardCards } = useContext(DeckBuilderContext);
    const inDeck = card.location === 'deck';
    const sets = card.sets_json || [];

    const onClose = () => setArtSelectorVisible(false);

    // TODO: Move most of this handling into reducer
    const onSelectCard = cardVariant => {
        // If the chosen variant is already selected, do nothing
        if (cardVariant.card_id === card.card_id) {
            setArtSelectorVisible(false);
            return;
        }

        const cardList = inDeck ? deckCards : maybeboardCards;
        const updateCardList = inDeck ? setDeckCards : setMaybeboardCards;
        const cardIndex = cardList.findIndex(c => c.card_id === card.card_id);
        const variantIndex = cardList.findIndex(c => c.card_id === cardVariant.card_id);
        let cards;
        let updatedCard;

        // Check if the selected variant already exists in the list
        if (variantIndex === -1) {
            updatedCard = {
                ...cardList[cardIndex],
                ...cardVariant,
                selection_type: 'manual',
            };
            cards = [...cardList.slice(0, cardIndex), updatedCard, ...cardList.slice(cardIndex + 1)];
        } else {
            // If the variant does exist, remove the previous card and combine the counts
            const count = (parseInt(cardList[cardIndex].count) || 1) + (parseInt(cardList[variantIndex].count) || 1);
            updatedCard = {
                ...cardList[cardIndex],
                ...cardVariant,
                selection_type: 'manual',
                count,
            };
            cards = [...cardList.slice(0, variantIndex), updatedCard, ...cardList.slice(variantIndex + 1)];
            cards = cards.filter(c => c.card_id !== card.card_id);
        }

        setCard(updatedCard);
        updateCardList(cards);
        setArtSelectorVisible(false);
    };

    return (
        <Backdrop visible={artSelectorVisible} onClose={onClose}>
            <div className='CardArtSelector'>
                <XButton className='CardArtSelector-closeButton' onClick={onClose} />
                <CardGrid className='CardArtSelector-cardGrid' cards={sets} currentCardID={card.card_id} onClick={onSelectCard} />
            </div>
        </Backdrop>
    );
}

export default CardArtSelector;
