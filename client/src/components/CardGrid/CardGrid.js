import NoResults from '../NoResults';
import CardGridImage from './CardGridImage';
import './CardGrid.scss';

function CardGrid({ className = '', cards = [], currentCardID = 0, isLink = false, onClick = () => {} }) {
    return (
        <NoResults showMessage={cards.length === 0}>
            <div className={`CardGrid ${className}`}>
                {cards.map(card => {
                    return (
                        <CardGridImage key={card.card_id} card={card} selected={card.card_id === currentCardID} isLink={isLink} onClick={onClick} />
                    );
                })}
            </div>
        </NoResults>
    );
}

export default CardGrid;
