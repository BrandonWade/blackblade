import React from 'react';
import NoResults from '../NoResults';
import './CardGrid.scss';

const CardGrid = ({ cards = [], onClick = () => {} }) => {
    return (
        <NoResults showMessage={cards.length === 0}>
            <div className='CardGrid'>
                {cards.map(card => {
                    const cardFace = card?.sets_json?.[0]?.card_faces?.[0]; // TODO: Assumes a list of cards is passed in instead of a list of "card shaped images"
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
