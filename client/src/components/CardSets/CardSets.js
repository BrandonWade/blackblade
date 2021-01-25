import { Link } from 'react-router-dom';
import CardSection from '../CardSection';
import './CardSets.scss';

function CardSets({ cardSets = [], currentCardID = 0 }) {
    return cardSets.length > 0 ? (
        <CardSection className='CardSets'>
            <ul className='CardSets-list'>
                {cardSets.map(set => {
                    return (
                        <Link
                            key={set.card_id}
                            to={`/cards/${set.card_id}`}
                            className={`CardSets-listItem CardSection-rowItem ${currentCardID === set.card_id ? 'CardSets-selectedSet' : ''}`}
                        >
                            <li className={'CardSets-rowContent'}>
                                <span>{set.set_name}</span>
                                <span>{set.price ? `$${set.price}` : null}</span>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </CardSection>
    ) : null;
}

export default CardSets;
