import { Link } from 'react-router-dom';
import withImagePreview from '../../hocs/withImagePreview';

function DeckRowName({ innerRef = null, cardID = 0, name = '', onMouseEnter = () => {}, onMouseLeave = () => {} }) {
    return (
        <Link to={`/cards/${cardID}`}>
            <div ref={innerRef} className='DeckTable-cardLink' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {name}
            </div>
        </Link>
    );
}

export default withImagePreview(DeckRowName);
