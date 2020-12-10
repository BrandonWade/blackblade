import React, { useContext } from 'react';
import CardArtSelectorContext from '../../contexts/CardArtSelectorContext';
import CardContext from '../../contexts/CardContext';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import Overlay from '../Overlay';
import CardGrid from '../CardGrid';
import './CardArtSelector.scss';

const CardArtSelector = () => {
    const { artSelectorVisible, setArtSelectorVisible } = useContext(CardArtSelectorContext);
    const { card, setCard } = useContext(CardContext);
    const { deckCards, setDeckCards } = useContext(DeckBuilderContext);
    const sets = card.sets_json || [];

    const onSelectCard = cardVariant => {
        const index = deckCards.findIndex(c => c.card_id === card.card_id);
        const updatedCard = {
            ...deckCards[index],
            ...cardVariant,
        };
        const cards = [...deckCards.slice(0, index), updatedCard, ...deckCards.slice(index + 1)];
        setCard(updatedCard);
        setDeckCards(cards);
        setArtSelectorVisible(false);
    };

    return artSelectorVisible ? (
        <div className='CardArtSelector'>
            <Overlay className='CardArtSelector-content' visible={true} setVisible={setArtSelectorVisible}>
                <CardGrid className='CardArtSelector-cardGrid' cards={sets} currentCardID={card.card_id} onClick={onSelectCard} />
            </Overlay>
        </div>
    ) : null;
};

export default CardArtSelector;
