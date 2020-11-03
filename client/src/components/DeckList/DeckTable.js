import React from 'react';
import DeckSection from './DeckSection';
import './DeckTable.scss';

const DeckTable = ({ deckCards = [], setDeckCards = () => {} }) => {
    const creatures = deckCards.filter(card => ['creature'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === true);
    const spells = deckCards.filter(card => ['creature', 'land'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === false);
    const land = deckCards.filter(card => ['land'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === true);

    const updateCount = (cardID, count) => {
        const index = deckCards.findIndex(c => c.card_id === cardID);
        const cards = [
            ...deckCards.slice(0, index),
            {
                ...deckCards[index],
                count: parseInt(count) || 1,
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
            <DeckSection deckCards={creatures} heading='Creatures' updateCount={updateCount} removeCard={removeCard} />
            <DeckSection deckCards={spells} heading='Spells' updateCount={updateCount} removeCard={removeCard} />
            <DeckSection deckCards={land} heading='Land' updateCount={updateCount} removeCard={removeCard} />
        </table>
    );
};

export default DeckTable;
