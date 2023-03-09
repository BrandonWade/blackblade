import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withSetCardImagePreviewPosition from '../../hocs/withSetCardImagePreviewPosition';
import LoadingSkeleton from '../LoadingSkeleton';

function CardSet({
    innerRef = null,
    loading = false,
    className = '',
    cardID = 0,
    setName = '',
    price = '',
    previewImageFront = '',
    previewImageBack = '',
    onMouseEnter = () => {},
    onMouseLeave = () => {},
}) {
    if (loading) {
        return (
            <div className='CardSets-listItem CardSection-rowItem CardSets-rowContent'>
                <LoadingSkeleton className='CardSets-rowContent CardSets-name--loading' />
                <LoadingSkeleton className='CardSets-rowContent CardSets-cost--loading' />
            </div>
        );
    }

    return (
        <Link to={`/cards/${cardID}`} className={`CardSets-listItem CardSection-rowItem ${className}`}>
            <div
                ref={innerRef}
                className={'CardSets-rowContent'}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                data-preview-image-front={previewImageFront}
                data-preview-image-back={previewImageBack}
            >
                <span>{setName}</span>
                <span>{price ? `$${price}` : null}</span>
            </div>
        </Link>
    );
}

CardSet.propTypes = {
    innerRef: PropTypes.object,
    loading: PropTypes.bool,
    className: PropTypes.string,
    cardID: PropTypes.number,
    setName: PropTypes.string,
    price: PropTypes.string,
    previewImageFront: PropTypes.string,
    previewImageBack: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

export default withSetCardImagePreviewPosition(CardSet);
