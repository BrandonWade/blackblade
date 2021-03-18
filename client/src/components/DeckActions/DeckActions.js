import { Link, useParams } from 'react-router-dom';
import { Pencil } from '../Icons';
import './DeckActions.scss';

function DeckActions() {
    const { publicID } = useParams();

    return (
        <div className='DeckActions'>
            <Link to={`/decks/${publicID}/edit`}>
                <div className='DeckActions-button'>
                    <Pencil />
                    <span className='DeckActions-buttonLabel'>Edit Deck</span>
                </div>
            </Link>
        </div>
    );
}

export default DeckActions;
