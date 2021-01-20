import React from 'react';
import { sortBy } from 'lodash';
import DeckSection from './DeckSection';
import './DeckTable.scss';

function DeckTable({ deckCards = [], maybeboardCards = [], maybeboardMode = false, setMaybeboardMode = () => {} }) {
    const deck = sortBy(deckCards, ['cmc']); // TODO: This sort logic should probably be in the reducer
    const maybeboard = sortBy(maybeboardCards, ['cmc']); // TODO: This sort logic should probably be in the reducer
    const creatures = deck.filter(card => ['creature'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === true);
    const spells = deck.filter(card => ['creature', 'land'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === false);
    const land = deck.filter(card => ['land'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === true);

    const toggleMaybeboardMode = () => {
        setMaybeboardMode(!maybeboardMode);
    };

    return (
        <table className='DeckTable-deck'>
            <DeckSection
                cards={creatures}
                heading='Creatures'
                type='creatures'
                visible={creatures.length > 0}
                className={maybeboardMode ? 'u-faded' : ''}
            />
            <DeckSection cards={spells} heading='Spells' type='spells' visible={spells.length > 0} className={maybeboardMode ? 'u-faded' : ''} />
            <DeckSection cards={land} heading='Land' type='land' visible={land.length > 0} className={maybeboardMode ? 'u-faded' : ''} />
            <DeckSection
                cards={maybeboard}
                heading='Maybeboard'
                type='maybeboard'
                visible={true}
                className={maybeboardMode ? '' : 'u-faded'}
                headingClassName={`DeckTable-maybeboardHeading ${maybeboardMode ? 'DeckTable-headingRow--active' : ''}`}
                onHeadingClick={toggleMaybeboardMode}
            />
        </table>
    );
}

export default DeckTable;
