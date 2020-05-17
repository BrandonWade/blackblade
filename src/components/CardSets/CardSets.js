import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import Card from '../Card';
import './CardSets.css';

const CardSets = () => {
    const card = useContext(CardContext);

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
