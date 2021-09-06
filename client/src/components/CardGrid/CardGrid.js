import CardImage from '../CardImage';
import './CardGrid.scss';

export default function CardGrid({ className = '', cards = [], currentCardID = 0, isLink = false, onClick = () => {} }) {
    return (
        <div className={`CardGrid ${className}`}>
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
    );
}
