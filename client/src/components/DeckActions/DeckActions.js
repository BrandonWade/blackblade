import { Link, useParams } from 'react-router-dom';
import { Pencil } from '../Icons';
import './DeckActions.scss';

function DeckActions() {
    const { publicID } = useParams();

    return (
        <div className='DeckActions'>
            <Link to={`/decks/${publicID}/edit`}>
                <div className='DeckActions-button'>
                    <Pencil className='DeckActions-renameDeck' />
                    <span className='DeckActions-buttonLabel'>Rename Deck</span>
                </div>
            </Link>
        </div>
    );
}

export default DeckActions;
