import NoResults from '../NoResults';
import CardImage from '../CardImage';
import './CardGrid.scss';

function CardGrid({ className = '', cards = [], currentCardID = 0, isLink = false, isCompact = true, onClick = () => {} }) {
    return (
        <NoResults showMessage={cards.length === 0}>
            <div className={`CardGrid ${className}`}>
                {cards.map(card => {
                    return (
                        <CardImage
                            key={card.card_id}
                            imageClassName='CardGrid-image'
                            card={card}
                            selected={card.card_id === currentCardID}
                            isLink={isLink}
                            isCompact={isCompact}
                            onClick={onClick}
                        />
                    );
                })}
            </div>
        </NoResults>
    );
}

export default CardGrid;
