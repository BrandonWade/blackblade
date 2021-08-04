import { useContext } from 'react';
import CardContext from '../../contexts/Card';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import Backdrop from '../Backdrop';
import XButton from '../XButton';
import CardGrid from '../CardGrid';
import './CardArtSelector.scss';

function CardArtSelector() {
    const { card } = useContext(CardContext);
    const { cardArtSelectorVisible, updateDeckCardArt, updateMaybeboardCardArt, hideCardArtSelector } = useContext(DeckBuilderContext);
    const inDeck = card.location === 'deck';
    const sets = card.sets_json || [];

    const onSelectCard = cardVariant => {
        // If the chosen variant is already selected, do nothing
        if (cardVariant.card_id === card.card_id) {
            hideCardArtSelector();
            return;
        }

        if (inDeck) {
            updateDeckCardArt(card.card_id, cardVariant);
        } else {
            updateMaybeboardCardArt(card.card_id, cardVariant);
        }
    };

    return (
        <Backdrop visible={cardArtSelectorVisible} onClose={hideCardArtSelector}>
            <div className='CardArtSelector'>
                <XButton className='CardArtSelector-closeButton' onClick={hideCardArtSelector} />
                <CardGrid className='CardArtSelector-cardGrid' cards={sets} currentCardID={card.card_id} onClick={onSelectCard} />
            </div>
        </Backdrop>
    );
}

export default CardArtSelector;
