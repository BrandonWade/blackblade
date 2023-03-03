import PropTypes from 'prop-types';
import DeckRow from './DeckRow';
import LoadingSkeleton from '../LoadingSkeleton';

function DeckSection({
    loading = false,
    cards = [],
    heading = '',
    type = '',
    visible = false,
    className = '',
    headingClassName = '',
    onHeadingClick = () => {},
}) {
    if (loading) {
        return (
            <tbody className={`DeckTable-section ${className}`}>
                <tr className='DeckTable-headingRow DeckTable-headingRow--loading'>
                    <th colSpan='100%' className={`DeckTable-heading ${headingClassName}`} onClick={onHeadingClick}>
                        <LoadingSkeleton className='DeckTable-heading--loading' />
                    </th>
                </tr>
                {new Array(4).fill().map((_, i) => (
                    <DeckRow key={i} loading={loading} />
                ))}
            </tbody>
        );
    }

    return visible ? (
        <tbody className={`DeckTable-section ${className}`}>
            <tr className='DeckTable-headingRow'>
                <th colSpan='100%' className={headingClassName} onClick={onHeadingClick}>
                    {heading}
                </th>
            </tr>
            {cards.map(card => (
                <DeckRow key={card.card_id} card={card} count={card.count} sectionType={type} />
            ))}
        </tbody>
    ) : null;
}

DeckSection.propTypes = {
    loading: PropTypes.bool,
    cards: PropTypes.array,
    heading: PropTypes.string,
    type: PropTypes.string,
    visible: PropTypes.bool,
    className: PropTypes.string,
    headingClassName: PropTypes.string,
    onHeadingClick: PropTypes.func,
};

export default DeckSection;
