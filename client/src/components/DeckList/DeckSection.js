import DeckRow from './DeckRow';

function DeckSection({ cards = [], heading = '', type = '', visible = false, className = '', headingClassName = '', onHeadingClick = () => {} }) {
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

export default DeckSection;
