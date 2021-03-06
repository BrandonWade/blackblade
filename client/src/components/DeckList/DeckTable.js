import DeckSection from './DeckSection';
import './DeckTable.scss';

function DeckTable({ deckCards = [], maybeboardCards = [], maybeboardMode = false, setMaybeboardMode = () => {} }) {
    const creatures = deckCards.filter(card => ['creature'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === true);
    const spells = deckCards.filter(card => ['creature', 'land'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === false);
    const land = deckCards.filter(card => ['land'].includes(card.sets_json[0]?.card_faces?.[0].derived_type) === true);

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
                cards={maybeboardCards}
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
