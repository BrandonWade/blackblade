import { useContext } from 'react';
import { parseIntFallback } from '../../helpers/parse';
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

    // TODO: Move most of this logic into reducer
    const onSelectCard = cardVariant => {
        // If the chosen variant is already selected, do nothing
        if (cardVariant.card_id === card.card_id) {
            setArtSelectorVisible(false);
            return;
        }

        const cardList = inDeck ? deckCards : maybeboardCards;
        const updateCardList = inDeck ? setDeckCards : setMaybeboardCards;
        const currentArtIndex = cardList.findIndex(c => c.card_id === card.card_id);
        const newArtIndex = cardList.findIndex(c => c.card_id === cardVariant.card_id);
        let cards = [];
        let updatedCard = {
            ...cardList[currentArtIndex],
            ...cardVariant,
            selection_type: 'manual',
        };

        // Check if the selected variant already exists in the list
        if (newArtIndex === -1) {
            cards = [...cardList.slice(0, currentArtIndex), updatedCard, ...cardList.slice(currentArtIndex + 1)];
        } else {
            // If the variant does exist, remove the previous card and combine the counts
            const count = parseIntFallback(cardList[currentArtIndex].count, 1) + parseIntFallback(cardList[newArtIndex].count, 1);
            updatedCard = {
                ...updatedCard,
                count,
            };
            cards = [...cardList.slice(0, newArtIndex), updatedCard, ...cardList.slice(newArtIndex + 1)];
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
