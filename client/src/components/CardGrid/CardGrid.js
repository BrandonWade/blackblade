import React from 'react';
import NoResults from '../NoResults';
import './CardGrid.scss';

const CardGrid = ({ cards = [], onClick = () => {} }) => {
    console.log('@@@@@', cards);
    return (
        <NoResults showMessage={cards.length === 0}>
            <div className='CardGrid'>
                {cards.map(card => {
                    const cardFace = card?.sets_json?.[0]?.card_faces?.[0];
                    return (
                        <img
                            key={card.card_id}
                            src={cardFace.image || ''}
                            alt={cardFace.name || ''}
                            className='CardGrid-image'
                            onClick={() => onClick(card)}
                        />
                    );
                })}
            </div>
        </NoResults>
    );
};

export default CardGrid;
