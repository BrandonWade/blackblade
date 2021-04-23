import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import DeckActionButton from './DeckActionButton';
import { Pencil, Export } from '../Icons';
import './DeckActions.scss';

function DeckActions() {
    const { publicID } = useParams();
    const { accountPublicID } = useContext(AuthContext);
    const { deckAccountPublicID } = useContext(DeckBuilderContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;

    return (
        <div className='DeckActions'>
            <DeckActionButton to={`/decks/${publicID}/edit`} visible={ownsDeck}>
                <Pencil />
                <span className='DeckActions-buttonLabel'>Edit Deck</span>
            </DeckActionButton>
            <DeckActionButton to={`/decks/${publicID}/export`}>
                <Export />
                <span className='DeckActions-buttonLabel'>Export Deck</span>
            </DeckActionButton>
        </div>
    );
}

export default DeckActions;
