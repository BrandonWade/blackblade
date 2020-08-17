import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import Card from '../Card';
import './CardSets.scss';

const CardSets = () => {
    const { card } = useContext(CardContext);

    // TODO: Return the full list of sets for this card
    return (
        <Card className='CardSets'>
            <ul className='CardSets-list'>
                {/* {(card.sets).map(set => (
                    <li key={set} className='Card-rowItem'>
                        {set}
                    </li>
                ))} */}
                <li className='Card-rowItem'>{card.set_name}</li>
            </ul>
        </Card>
    );
};

export default CardSets;
