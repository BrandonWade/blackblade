import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import ExportDeckDialogContext from '../../contexts/ExportDeckDialog';
import DeckActionButton from './DeckActionButton';
import { Pencil, Export } from '../Icons';
import './DeckActions.scss';

function DeckActions() {
    const { publicID } = useParams();
    const { exportDeck } = useDeck();
    const { accountPublicID } = useContext(AuthContext);
    const { deckAccountPublicID, deckCards, maybeboardCards } = useContext(DeckBuilderContext);
    const { setDeckExport, setVisible } = useContext(ExportDeckDialogContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;
    const hasCards = deckCards.length > 0 || maybeboardCards.length > 0;

    const onExportDeck = async () => {
        const result = await exportDeck(publicID);
        if (!result.success) {
            return;
        }

        setDeckExport(result.deckExport);
        setVisible(true);
    };

    return (
        <div className='DeckActions'>
            <DeckActionButton to={`/decks/${publicID}/edit`} visible={ownsDeck}>
                <Pencil />
                <span className='DeckActions-buttonLabel'>Edit Deck</span>
            </DeckActionButton>
            <DeckActionButton onClick={onExportDeck} visible={hasCards}>
                <Export />
                <span className='DeckActions-buttonLabel'>Export Deck</span>
            </DeckActionButton>
        </div>
    );
}

export default DeckActions;
