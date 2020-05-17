import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import './CardImage.css';

const CardImage = () => {
    const card = useContext(CardContext);

    return <img src={card.image} alt='Card' className='card-info__image' />;
};

export default CardImage;
