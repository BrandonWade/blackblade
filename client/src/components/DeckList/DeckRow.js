import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSymbols from '../../hooks/useSymbols';
import Input from '../../components/Input';

const DeckRow = ({ card = {}, updateCount = () => {}, removeCard = () => {} }) => {
    const manaCost = useSymbols(card.mana_cost);
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
            <td className='DeckTable-manaCost' dangerouslySetInnerHTML={{ __html: manaCost }} />
            <td className='DeckTable-name'>
                <Link to={`/cards/${card.card_id}`}>{card.name}</Link>
            </td>
            <td className='DeckTable-remove' onClick={onRemoveCard}>
                &#10799;
            </td>
        </tr>
    );
};

export default DeckRow;
