import { Link } from 'react-router-dom';

export default function CardSet({ className = '', cardID = 0, setName = '', price = 0.0 }) {
    return (
        <Link to={`/cards/${cardID}`} className={`CardSets-listItem CardSection-rowItem ${className}`}>
            <li className={'CardSets-rowContent'}>
                <span>{setName}</span>
                <span>{price ? `$${price}` : null}</span>
            </li>
        </Link>
    );
}
