import { Link } from 'react-router-dom';
import withSetCardImagePreviewPosition from '../../hocs/withSetCardImagePreviewPosition';

function DeckRowName({
    innerRef = null,
    previewImageFront = '',
    previewImageBack = '',
    cardID = 0,
    name = '',
    onMouseEnter = () => {},
    onMouseLeave = () => {},
}) {
    return (
        <Link to={`/cards/${cardID}`}>
            <div
                ref={innerRef}
                className='DeckTable-cardLink'
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                data-preview-image-front={previewImageFront}
                data-preview-image-back={previewImageBack}
            >
                {name}
            </div>
        </Link>
    );
}

export default withSetCardImagePreviewPosition(DeckRowName);
