import { useContext } from 'react';
import useCardGroups from '../../hooks/useCardGroups';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import BackgroundMessage, { EMPTY_DECK_PREVIEW } from '../BackgroundMessage';
import CardGrid from '../CardGrid';
import './DeckPreview.scss';

export default function DeckPreview() {
    const { deckCards, maybeboardCards } = useContext(DeckBuilderContext);
    const { creatures, spells, land } = useCardGroups(deckCards);

    return (
        <div className='DeckPreview'>
            <BackgroundMessage showMessage={deckCards.length + maybeboardCards.length === 0} type={EMPTY_DECK_PREVIEW}>
                {creatures.length ? <CardGrid className='DeckPreview-cardGrid' cards={creatures} isLink={true} /> : null}
                {spells.length ? <CardGrid className='DeckPreview-cardGrid' cards={spells} isLink={true} /> : null}
                {land.length ? <CardGrid className='DeckPreview-cardGrid' cards={land} isLink={true} /> : null}
                {maybeboardCards.length ? <CardGrid className='DeckPreview-cardGrid' cards={maybeboardCards} isLink={true} /> : null}
            </BackgroundMessage>
        </div>
    );
}
