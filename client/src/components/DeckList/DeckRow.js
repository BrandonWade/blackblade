import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeckRowManaCost from './DeckRowManaCost';
import Input from '../../components/Input';

const DeckRow = ({ card = {}, updateCount = () => {}, removeCard = () => {} }) => {
    const cardFaces = card?.sets_json?.[0]?.card_faces;
    const [count, setCount] = useState(card.count);

    const onCountChange = e => {
        setCount(e.target.value);
        updateCount(card.card_id, e.target.value);
    };

    const onRemoveCard = () => {
        removeCard(card.card_id);
    };

    return (
        <tr key={card.card_id} className='DeckTable-cardRow'>
            <td className='DeckTable-count'>
                <Input className='DeckTable-input' value={count} onChange={onCountChange} />
            </td>
            <td className='DeckTable-manaCosts'>
                {cardFaces.map((face, i) => (
                    <DeckRowManaCost key={i} manaCost={face.mana_cost} />
                ))}
            </td>
            <td className='DeckTable-names'>
                {cardFaces.map((face, i) => (
                    <div key={i} className='DeckTable-subRow'>
                        <Link to={`/cards/${card.card_id}`}>{face.name}</Link>
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
