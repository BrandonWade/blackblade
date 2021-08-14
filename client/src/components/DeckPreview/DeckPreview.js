import { useContext } from 'react';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import BackgroundMessage, { EMPTY_DECK_PREVIEW } from '../BackgroundMessage';
import CardGrid from '../CardGrid';
import './DeckPreview.scss';

export default function DeckPreview() {
    const { deckCards, maybeboardCards } = useContext(DeckBuilderContext);

    return (
        <div className='DeckPreview'>
            <BackgroundMessage showMessage={deckCards.length + maybeboardCards.length === 0} type={EMPTY_DECK_PREVIEW}>
                {deckCards.length ? <CardGrid className='DeckPreview-cardGrid' cards={deckCards} /> : null}
                {maybeboardCards.length ? <CardGrid className='DeckPreview-cardGrid' cards={maybeboardCards} /> : null}
            </BackgroundMessage>
        </div>
    );
}
