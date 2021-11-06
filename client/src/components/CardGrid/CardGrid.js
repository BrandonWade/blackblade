import CardImage from '../CardImage';
import './CardGrid.scss';

export default function CardGrid({
    className = '',
    gridClassName = '',
    heading = '',
    cards = [],
    currentCardID = 0,
    isLink = false,
    onClick = () => {},
}) {
    return (
        <div className={`CardGrid ${className}`}>
            {heading ? <h3 className='CardGrid-heading'>{heading}</h3> : null}
            <div className={`CardGrid-content ${gridClassName}`}>
                {cards.map(card => {
                    return (
                        <CardImage
                            key={card.card_id}
                            imageClassName='CardGrid-image'
                            card={card}
                            isSelected={card.card_id === currentCardID}
                            isLink={isLink}
                            isCompact={true}
                            onClick={onClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}
