import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import ExportDeckDialogContext from '../../contexts/ExportDeckDialog';
import MessageDialogContext from '../../contexts/MessageDialog';
import DeckActionButton from './DeckActionButton';
import { Pencil, Export } from '../Icons';
import './DeckActions.scss';

function DeckActions() {
    const { publicID } = useParams();
    const history = useHistory();
    const { exportDeck } = useDeck();
    const { accountPublicID } = useContext(AuthContext);
    const { deckAccountPublicID, deckCards, maybeboardCards } = useContext(DeckBuilderContext);
    const { setDeckExport, setVisible } = useContext(ExportDeckDialogContext);
    const { setMessage } = useContext(MessageDialogContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;
    const hasCards = deckCards.length > 0 || maybeboardCards.length > 0;

    const onEditDeck = () => {
        history.replace(`/decks/${publicID}/edit`);
    };

    const onExportDeck = async () => {
        const result = await exportDeck(publicID);
        if (!result.success) {
            setMessage(result.message.text);
            return;
        }

        setDeckExport(result.deckExport);
        setVisible(true);
    };

    return (
        <div className='DeckActions'>
            <DeckActionButton visible={ownsDeck} onClick={onEditDeck}>
                <Pencil />
                <span className='DeckActions-buttonLabel'>Edit Deck</span>
            </DeckActionButton>
            <DeckActionButton visible={hasCards} onClick={onExportDeck}>
                <Export />
                <span className='DeckActions-buttonLabel'>Export Deck</span>
            </DeckActionButton>
        </div>
    );
}

export default DeckActions;
