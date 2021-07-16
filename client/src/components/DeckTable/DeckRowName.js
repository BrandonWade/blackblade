import { Link } from 'react-router-dom';
import withSetCardImagePreviewPosition from '../../hocs/withSetCardImagePreviewPosition';

function DeckRowName({ innerRef = null, previewImage = '', cardID = 0, name = '', onMouseEnter = () => {}, onMouseLeave = () => {} }) {
    return (
        <Link to={`/cards/${cardID}`}>
            <div
                ref={innerRef}
                className='DeckTable-cardLink'
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                data-preview-image={previewImage}
            >
                {name}
            </div>
        </Link>
    );
}

export default withSetCardImagePreviewPosition(DeckRowName);
