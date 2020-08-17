import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import './CardImage.scss';

const CardImage = () => {
    const card = useContext(CardContext);

    return <img src={card.image} alt='Card' className='CardImage' />;
};

export default CardImage;
