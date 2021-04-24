import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import ExportDeckDialogContext from '../../contexts/ExportDeckDialog';
import DeckActionButton from './DeckActionButton';
import { Pencil, Export } from '../Icons';
import './DeckActions.scss';

function DeckActions() {
    const { publicID } = useParams();
    const { accountPublicID } = useContext(AuthContext);
    const { deckAccountPublicID } = useContext(DeckBuilderContext);
    const { setVisible } = useContext(ExportDeckDialogContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;

    const onExportDeck = () => {
        setVisible(true);
    };

    return (
        <div className='DeckActions'>
            <DeckActionButton to={`/decks/${publicID}/edit`} visible={ownsDeck}>
                <Pencil />
                <span className='DeckActions-buttonLabel'>Edit Deck</span>
            </DeckActionButton>
            <DeckActionButton onClick={onExportDeck}>
                <Export />
                <span className='DeckActions-buttonLabel'>Export Deck</span>
            </DeckActionButton>
        </div>
    );
}

export default DeckActions;
