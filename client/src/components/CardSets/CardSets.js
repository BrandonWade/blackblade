import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import Card from '../Card';
import './CardSets.scss';

const CardSets = () => {
    const card = useContext(CardContext);

    return (
        <Card className='CardSets'>
            <ul className='CardSets-list'>
                {card.sets.map(set => (
                    <li key={set} className='Card-rowItem'>
                        {set}
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default CardSets;
