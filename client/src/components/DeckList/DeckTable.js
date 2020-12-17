import React from 'react';
import { sortBy } from 'lodash';
import DeckSection from './DeckSection';
import './DeckTable.scss';

const DeckTable = ({
    deckCards = [],
    setDeckCards = () => {},
    maybeboardCards = [],
    setMaybeboardCards = () => {},
    maybeboardMode = false,
    setMaybeboardMode = () => {},
}) => {
    const deck = sortBy(deckCards, ['cmc']);
    const maybeboard = sortBy(maybeboardCards, ['cmc']);
    const creatures = deck.filter(card => ['creature'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === true);
    const spells = deck.filter(card => ['creature', 'land'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === false);
    const land = deck.filter(card => ['land'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === true);

    const updateCount = (cardID, count, location) => {
        const inDeck = location === 'deck';
        const cardList = inDeck ? deckCards : maybeboardCards;
        const updateCardList = inDeck ? setDeckCards : setMaybeboardCards;
        const index = cardList.findIndex(c => c.card_id === cardID);
        const cards = [
            ...cardList.slice(0, index),
            {
                ...cardList[index],
                count: parseInt(count) || 1,
            },
            ...cardList.slice(index + 1),
        ];

        updateCardList(cards);
    };

    const removeCard = (cardID, location) => {
        const inDeck = location === 'deck';
        const cardList = inDeck ? deckCards : maybeboardCards;
        const updateCardList = inDeck ? setDeckCards : setMaybeboardCards;
        updateCardList(cardList.filter(c => c.card_id !== cardID));
    };

    const toggleMaybeboardMode = () => {
        setMaybeboardMode(prevMaybeboardMode => !prevMaybeboardMode);
    };

    return (
        <table className='DeckTable-deck'>
            <DeckSection cards={creatures} heading='Creatures' visible={creatures.length > 0} updateCount={updateCount} removeCard={removeCard} />
            <DeckSection cards={spells} heading='Spells' visible={spells.length > 0} updateCount={updateCount} removeCard={removeCard} />
            <DeckSection cards={land} heading='Land' visible={land.length > 0} updateCount={updateCount} removeCard={removeCard} />
            <DeckSection
                cards={maybeboard}
                heading='Maybeboard'
                visible={true}
                updateCount={updateCount}
                removeCard={removeCard}
                headingClassName={`DeckTable-maybeboardHeading ${maybeboardMode ? 'DeckTable-headingRow--active' : ''}`}
                onHeadingClick={toggleMaybeboardMode}
            />
        </table>
    );
};

export default DeckTable;
