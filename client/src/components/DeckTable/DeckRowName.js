import { Link } from 'react-router-dom';
import withImagePreview from '../../hocs/withImagePreview';

function DeckRowName({ cardID = 0, name = '', onMouseEnter = () => {}, onMouseLeave = () => {} }) {
    return (
        <Link to={`/cards/${cardID}`}>
            <div className='DeckTable-cardLink' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {name}
            </div>
        </Link>
    );
}

export default withImagePreview(DeckRowName);
