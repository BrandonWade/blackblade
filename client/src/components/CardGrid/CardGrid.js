import NoResults from '../NoResults';
import CardImage from '../CardImage';
import './CardGrid.scss';

function CardGrid({ className = '', cards = [], currentCardID = 0, isLink = false, onClick = () => {} }) {
    return (
        <NoResults showMessage={cards.length === 0}>
            <div className={`CardGrid ${className}`}>
                {cards.map(card => {
                    return (
                        <CardImage
                            key={card.card_id}
                            imageClassName='CardGrid-image'
                            cardID={card.card_id}
                            card={card} // TODO: Remove
                            selected={card.card_id === currentCardID}
                            isLink={isLink}
                            isCompact={true}
                            onClick={onClick}
                        />
                    );
                })}
            </div>
        </NoResults>
    );
}

export default CardGrid;
