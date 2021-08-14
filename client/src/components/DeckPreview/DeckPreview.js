import { useContext } from 'react';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import CardGrid from '../CardGrid';
import './DeckPreview.scss';

export default function DeckPreview() {
    const { deckCards, maybeboardCards } = useContext(DeckBuilderContext);

    return (
        <div className='DeckPreview'>
            <CardGrid className='DeckPreview-cardGrid' cards={deckCards} />
            <CardGrid className='DeckPreview-cardGrid' cards={maybeboardCards} />
        </div>
    );
}
