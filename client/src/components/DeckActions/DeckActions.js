import { useParams } from 'react-router-dom';
import DeckActionButton from './DeckActionButton';
import { Pencil } from '../Icons';
import './DeckActions.scss';

function DeckActions() {
    const { publicID } = useParams();

    return (
        <div className='DeckActions'>
            <DeckActionButton to={`/decks/${publicID}/edit`}>
                <Pencil />
                <span className='DeckActions-buttonLabel'>Edit Deck</span>
            </DeckActionButton>
        </div>
    );
}

export default DeckActions;
