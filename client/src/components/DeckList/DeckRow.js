import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CardContext from '../../contexts/Card';
import CardArtSelectorContext from '../../contexts/CardArtSelector';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import DeckRowManaCost from './DeckRowManaCost';
import Input from '../../components/Input';
import { Images, ArrowUp, ArrowDown } from '../Icons';

function DeckRow({ card = {}, count = 0, sectionType = '' }) {
    const { setCard } = useContext(CardContext);
    const { setArtSelectorVisible } = useContext(CardArtSelectorContext);
    const { updateDeckCardCount, removeDeckCard, updateMaybeboardCardCount, removeMaybeboardCard, moveToDeck, moveToMaybeboard } = useContext(
        DeckBuilderContext
    );
    const cardFaces = card?.sets_json?.[0]?.card_faces;
    const inDeck = card.location === 'deck';
    const isMaybeboardSection = sectionType === 'maybeboard';

    const onCountChange = e => {
        const updateCardCount = inDeck ? updateDeckCardCount : updateMaybeboardCardCount;
        updateCardCount(card.card_id, e.target.value);
    };

    const onSelectArt = () => {
        setCard(card);
        setArtSelectorVisible(true);
    };

    const onSwitchSection = () => {
        const moveCard = isMaybeboardSection ? moveToDeck : moveToMaybeboard;
        moveCard(card.card_id, card.count);
    };

    const onRemoveCard = () => {
        const removeCard = inDeck ? removeDeckCard : removeMaybeboardCard;
        removeCard(card.card_id);
    };

    return (
        <tr key={card.card_id} className='DeckTable-cardRow'>
            <td className='DeckTable-count'>
                <Input className='DeckTable-input' value={count} onChange={onCountChange} />
            </td>
            <td className='DeckTable-selectArt' onClick={onSelectArt}>
                <Images className='DeckTable-selectArtIcon' />
            </td>
            <td className='DeckTable-switchSection' onClick={onSwitchSection}>
                {isMaybeboardSection ? <ArrowUp className='DeckTable-switchSectionIcon' /> : <ArrowDown className='DeckTable-switchSectionIcon' />}
            </td>
            <td className='DeckTable-manaCosts'>
                {cardFaces.map((face, i) => (
                    <DeckRowManaCost key={i} manaCost={face.mana_cost} />
                ))}
            </td>
            <td className='DeckTable-names'>
                {cardFaces.map((face, i) => (
                    <div key={i} className='DeckTable-subRow'>
                        <Link to={`/cards/${card.card_id}`}>
                            <span className='DeckTable-cardLink'>{face.name}</span>
                        </Link>
                    </div>
                ))}
            </td>
            <td className='DeckTable-remove' onClick={onRemoveCard}>
                &#x2715;
            </td>
        </tr>
    );
}

export default DeckRow;
