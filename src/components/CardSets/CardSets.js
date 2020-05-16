import React from 'react';
import Card from '../Card';
import './CardSets.css';

const CardSets = ({ card }) => {
    return (
        <Card className='card-info__sets'>
            <ul className='card-info__set-list'>
                {card.sets.map((set) => (
                    <li key={set} className='card__row-item'>
                        {set}
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default CardSets;
