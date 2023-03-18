import { useContext } from 'react';
import PropTypes from 'prop-types';
import useCardGroups from '../../hooks/useCardGroups';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import CardGrid from '../CardGrid';
import './DeckPreview.scss';

function DeckPreview({ loading = false }) {
    const { deckCards, maybeboardCards } = useContext(DeckBuilderContext);
    const { creatures, spells, land } = useCardGroups(deckCards);

    if (loading) {
        return (
            <div className='DeckPreview'>
                <CardGrid loading={loading} className='DeckPreview-cardGrid' heading='Creatures' />
                <CardGrid loading={loading} className='DeckPreview-cardGrid' heading='Spells' />
                <CardGrid loading={loading} className='DeckPreview-cardGrid' heading='Land' />
                <CardGrid loading={loading} className='DeckPreview-cardGrid' heading='Maybeboard' />
            </div>
        );
    }

    return (
        <div className='DeckPreview'>
            {creatures.length ? <CardGrid className='DeckPreview-cardGrid' heading='Creatures' cards={creatures} isLink={true} /> : null}
            {spells.length ? <CardGrid className='DeckPreview-cardGrid' heading='Spells' cards={spells} isLink={true} /> : null}
            {land.length ? <CardGrid className='DeckPreview-cardGrid' heading='Land' cards={land} isLink={true} /> : null}
            {maybeboardCards.length ? <CardGrid className='DeckPreview-cardGrid' heading='Maybeboard' cards={maybeboardCards} isLink={true} /> : null}
        </div>
    );
}

DeckPreview.propTypes = {
    loading: PropTypes.bool,
};

export default DeckPreview;
