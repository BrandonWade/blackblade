import React from 'react';
import CardDescription from '../CardDescription';
import CardSets from '../CardSets';
import './CardInfo.css';

const CardInfo = ({ card }) => {
    return (
        <section className='card-info'>
            <img
                src='https://img.scryfall.com/cards/large/front/9/2/92d07c87-4f7e-48a4-949a-087dd391d1d4.jpg?1562922215'
                alt='Card'
                className='card-info__image'
            />
            <CardDescription card={card} />
            <CardSets card={card} />
        </section>
    );
};

export default CardInfo;
