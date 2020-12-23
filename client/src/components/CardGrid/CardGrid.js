import React from 'react';
import NoResults from '../NoResults';
import CardGridImage from './CardGridImage';
import './CardGrid.scss';

function CardGrid({ className = '', cards = [], currentCardID = 0, onClick = () => {} }) {
    return (
        <NoResults showMessage={cards.length === 0}>
            <div className={`CardGrid ${className}`}>
                {cards.map(card => {
                    return <CardGridImage card={card} selected={card.card_id === currentCardID} onClick={onClick} />;
                })}
            </div>
        </NoResults>
    );
}

export default CardGrid;
