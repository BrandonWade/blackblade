import React from 'react';
import DeckRow from './DeckRow';

const DeckSection = ({ cards = [], heading = '', updateCount = () => {}, removeCard = () => {} }) => {
    return cards.length > 0 ? (
        <tbody className='DeckTable-section'>
            <tr className='DeckTable-headingRow'>
                <th colSpan='100%'>{heading}</th>
            </tr>
            {cards.map(card => (
                <DeckRow key={card.card_id} card={card} updateCount={updateCount} removeCard={removeCard} />
            ))}
        </tbody>
    ) : null;
};

export default DeckSection;
