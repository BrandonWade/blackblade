import React from 'react';
import DeckRow from './DeckRow';

const DeckSection = ({
    cards = [],
    heading = '',
    visible = false,
    updateCount = () => {},
    removeCard = () => {},
    headingClassName = '',
    onHeadingClick = () => {},
}) => {
    return visible ? (
        <tbody className='DeckTable-section'>
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
};

export default DeckSection;
