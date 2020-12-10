import React from 'react';
import NoResults from '../NoResults';
import './CardGrid.scss';

const CardGrid = ({ className = '', cards = [], currentCardID = 0, onClick = () => {} }) => {
    return (
        <NoResults showMessage={cards.length === 0}>
            <div className={`CardGrid ${className}`}>
                {cards.map(card => {
                    const cardFace = card?.sets_json ? card?.sets_json?.[0]?.card_faces?.[0] : card.card_faces?.[0];
                    return (
                        <img
                            key={card.card_id}
                            src={cardFace.image || ''}
                            alt={cardFace.name || ''}
                            className={`CardGrid-image ${card.card_id === currentCardID ? 'CardGrid-selected' : ''}`}
                            onClick={() => onClick(card)}
                        />
                    );
                })}
            </div>
        </NoResults>
    );
};

export default CardGrid;
