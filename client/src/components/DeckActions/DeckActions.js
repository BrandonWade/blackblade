import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDecks from '../../hooks/useDecks';
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
    const { saveDeck, exportDeck } = useDecks();
    const { accountPublicID } = useContext(AuthContext);
    const {
        deckAccountPublicID,
        deckName,
        deckVisibility,
        deckCards,
        maybeboardCards,
        setUnmodifiedDeckName,
        setUnmodifiedDeckVisibility,
        setUnmodifiedDeckCards,
        setUnmodifiedMaybeboardCards,
    } = useContext(DeckBuilderContext);
    const { setDeckExport, setVisible } = useContext(ExportDeckDialogContext);
    const { setMessage } = useContext(MessageDialogContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;
    const hasCards = deckCards.length > 0 || maybeboardCards.length > 0;

    const onEditDeck = () => {
        history.replace(`/decks/${publicID}/edit`);
    };

    const onExportDeck = async () => {
        // Since the deck export comes from the backend, ensure we persist the latest deck state before exporting
        const saveResult = await saveDeck(publicID, deckName, deckVisibility, deckCards, maybeboardCards);
        if (!saveResult?.success) {
            setMessage(saveResult?.message?.text);
            return;
        }

        // Once changes to the deck have been saved, update the unmodified state
        setUnmodifiedDeckName();
        setUnmodifiedDeckVisibility();
        setUnmodifiedDeckCards();
        setUnmodifiedMaybeboardCards();

        const exportResult = await exportDeck(publicID);
        if (!exportResult.success) {
            setMessage(exportResult.message.text);
            return;
        }

        setDeckExport(exportResult.deckExport);
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
