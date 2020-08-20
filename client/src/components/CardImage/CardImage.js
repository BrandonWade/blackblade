import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import './CardImage.scss';

const CardImage = () => {
    const { card } = useContext(CardContext);
    const cardSets = JSON.parse(card?.sets || '[]');
    const cardSet = cardSets.length > 0 ? cardSets[0] : {};

    return <img src={cardSet.image} alt={`${cardSet.set_name} ${card.name}`} className='CardImage' />;
};

export default CardImage;
