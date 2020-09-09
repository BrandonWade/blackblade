import React from 'react';
import DeckRow from './DeckRow';
import './DeckTable.scss';

const DeckTable = ({ deckCards = [], setDeckCards }) => {
    const updateCount = (cardID, count) => {
        const index = deckCards.findIndex(c => c.card_id === cardID);
        const cards = [
            ...deckCards.slice(0, index),
            {
                ...deckCards[index],
                count,
            },
            ...deckCards.slice(index + 1),
        ];
        setDeckCards(cards);
    };

    const removeCard = cardID => {
        setDeckCards(deckCards.filter(c => c.card_id !== cardID));
    };

    return (
        <table className='DeckTable-deck'>
            <tbody>
                {deckCards.map(card => (
                    <DeckRow key={card.card_id} card={card} updateCount={updateCount} removeCard={removeCard} />
                ))}
            </tbody>
        </table>
    );
};

export default DeckTable;
