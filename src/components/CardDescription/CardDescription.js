import React from 'react';
import Card from '../Card';
import './CardDescription.css';

const CardDescription = ({ card }) => {
    const renderText = () => {
        const lines = card.text.split('\n');
        return lines.map((l) => (
            <p key={l} className='card-info__description-block'>
                {l}
            </p>
        ));
    };

    return (
        <Card className='card-info__description'>
            <h2 className='card__row-item card-info__title'>
                {card.title}
                <span className='card-info__mana-cost'>{card.manaCost}</span>
            </h2>
            <div className='card__row-item card-info__type'>{card.type}</div>
            <div className='card__row-item card-info__text'>{renderText()}</div>
            <div className='card__row-item card-info__stats'>{card.stats}</div>
        </Card>
    );
};

export default CardDescription;
