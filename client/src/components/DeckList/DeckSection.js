import React from 'react';
import DeckRow from './DeckRow';

function DeckSection({
    cards = [],
    heading = '',
    visible = false,
    updateCount = () => {},
    removeCard = () => {},
    className = '',
    headingClassName = '',
    onHeadingClick = () => {},
}) {
    return visible ? (
        <tbody className={`DeckTable-section ${className}`}>
            <tr className='DeckTable-headingRow'>
                <th colSpan='100%' className={headingClassName} onClick={onHeadingClick}>
                    {heading}
                </th>
            </tr>
            {cards.map(card => (
                <DeckRow key={card.card_id} card={card} updateCount={updateCount} removeCard={removeCard} />
            ))}
        </tbody>
    ) : null;
}

export default DeckSection;
