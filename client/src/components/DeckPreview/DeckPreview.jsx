import { useContext } from 'react';
import useCardGroups from '../../hooks/useCardGroups';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import CardGrid from '../CardGrid';
import './DeckPreview.scss';

export default function DeckPreview() {
    const { deckCards, maybeboardCards } = useContext(DeckBuilderContext);
    const { creatures, spells, land } = useCardGroups(deckCards);

    return (
        <div className='DeckPreview'>
            {creatures.length ? <CardGrid className='DeckPreview-cardGrid' heading='Creatures' cards={creatures} isLink={true} /> : null}
            {spells.length ? <CardGrid className='DeckPreview-cardGrid' heading='Spells' cards={spells} isLink={true} /> : null}
            {land.length ? <CardGrid className='DeckPreview-cardGrid' heading='Land' cards={land} isLink={true} /> : null}
            {maybeboardCards.length ? <CardGrid className='DeckPreview-cardGrid' heading='Maybeboard' cards={maybeboardCards} isLink={true} /> : null}
        </div>
    );
}
