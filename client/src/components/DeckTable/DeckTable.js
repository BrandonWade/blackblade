import { useContext } from 'react';
import useCardGroups from '../../hooks/useCardGroups';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import DeckSection from './DeckSection';
import './DeckTable.scss';

export default function DeckTable({ deckCards = [], maybeboardCards = [], maybeboardMode = false, setMaybeboardMode = () => {} }) {
    const { creatures, spells, land } = useCardGroups(deckCards);
    const { accountPublicID } = useContext(AuthContext);
    const { deckAccountPublicID } = useContext(DeckBuilderContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;

    const toggleMaybeboardMode = () => {
        setMaybeboardMode(ownsDeck && !maybeboardMode);
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
                className={ownsDeck && !maybeboardMode ? 'u-faded' : ''}
                headingClassName={`DeckTable-maybeboardHeading ${maybeboardMode ? 'DeckTable-headingRow--active' : ''}`}
                onHeadingClick={toggleMaybeboardMode}
            />
        </table>
    );
}
