import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardContext from '../../contexts/Card';
import CardArtSelectorContext from '../../contexts/CardArtSelector';
import DeckRowManaCost from './DeckRowManaCost';
import Input from '../../components/Input';
import { Images } from '../Icons';

const DeckRow = ({ card = {}, updateCount = () => {}, removeCard = () => {} }) => {
    const history = useHistory();
    const { setCard } = useContext(CardContext);
    const { setArtSelectorVisible } = useContext(CardArtSelectorContext);
    const cardFaces = card?.sets_json?.[0]?.card_faces;
    const [count, setCount] = useState(card.count);

    const onCountChange = e => {
        setCount(e.target.value);
        updateCount(card.card_id, e.target.value, card.location);
    };

    const onSelectArt = () => {
        setCard(card);
        setArtSelectorVisible(true);
    };

    const onLinkClick = () => {
        setCard(card);
        history.push(`/cards/${card.card_id}`);
    };

    const onRemoveCard = () => {
        removeCard(card.card_id, card.location);
    };

    return (
        <tr key={card.card_id} className='DeckTable-cardRow'>
            <td className='DeckTable-count'>
                <Input className='DeckTable-input' value={count} onChange={onCountChange} />
            </td>
            <td className='DeckTable-selectArt' onClick={onSelectArt}>
                <Images className='DeckTable-selectArtIcon' />
            </td>
            <td className='DeckTable-manaCosts'>
                {cardFaces.map((face, i) => (
                    <DeckRowManaCost key={i} manaCost={face.mana_cost} />
                ))}
            </td>
            <td className='DeckTable-names'>
                {cardFaces.map((face, i) => (
                    <div key={i} className='DeckTable-subRow'>
                        <span className='DeckTable-cardLink' onClick={onLinkClick}>
                            {face.name}
                        </span>
                    </div>
                ))}
            </td>
            <td className='DeckTable-remove' onClick={onRemoveCard}>
                &#10799;
            </td>
        </tr>
    );
};

export default DeckRow;
