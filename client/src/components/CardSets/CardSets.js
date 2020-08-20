import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import Card from '../Card';
import './CardSets.scss';

const CardSets = () => {
    const { card } = useContext(CardContext);
    const cardSets = JSON.parse(card?.sets || '[]');

    return (
        <Card className='CardSets'>
            <ul className='CardSets-list'>
                {cardSets.map((set, i) => (
                    <li key={i} className='Card-rowItem'>
                        {set.set_name}
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default CardSets;
