import { Link } from 'react-router-dom';
import withSetCardImagePreviewPosition from '../../hocs/withSetCardImagePreviewPosition';

function CardSet({
    innerRef = null,
    className = '',
    cardID = 0,
    setName = '',
    price = 0.0,
    previewImageFront = '',
    previewImageBack = '',
    onMouseEnter = () => {},
    onMouseLeave = () => {},
}) {
    return (
        <Link to={`/cards/${cardID}`} className={`CardSets-listItem CardSection-rowItem ${className}`}>
            <li
                ref={innerRef}
                className={'CardSets-rowContent'}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                data-preview-image-front={previewImageFront}
                data-preview-image-back={previewImageBack}
            >
                <span>{setName}</span>
                <span>{price ? `$${price}` : null}</span>
            </li>
        </Link>
    );
}

export default withSetCardImagePreviewPosition(CardSet);
