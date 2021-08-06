import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDecks from '../../hooks/useDecks';
import useMessage from '../../hooks/useMessage';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext, { isDeckUnmodified } from '../../contexts/DeckBuilder';
import ExportDeckDialogContext from '../../contexts/ExportDeckDialog';
import DeckActionButton from './DeckActionButton';
import { Pencil, Export } from '../Icons';
import './DeckActions.scss';

function DeckActions() {
    const { publicID } = useParams();
    const history = useHistory();
    const { saveDeck, exportDeck } = useDecks();
    const { showMessage } = useMessage();
    const { accountPublicID } = useContext(AuthContext);
    const {
        deckAccountPublicID,
        deckName,
        deckVisibility,
        deckCards,
        maybeboardCards,
        unmodifiedDeckName,
        unmodifiedDeckVisibility,
        unmodifiedDeckCards,
        unmodifiedMaybeboardCards,
        setUnmodifiedDeckName,
        setUnmodifiedDeckVisibility,
        setUnmodifiedDeckCards,
        setUnmodifiedMaybeboardCards,
    } = useContext(DeckBuilderContext);
    const { setDeckExport, setVisible } = useContext(ExportDeckDialogContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;
    const hasCards = deckCards.length > 0 || maybeboardCards.length > 0;
    const isUnmodified = isDeckUnmodified(
        deckName,
        deckVisibility,
        deckCards,
        maybeboardCards,
        unmodifiedDeckName,
        unmodifiedDeckVisibility,
        unmodifiedDeckCards,
        unmodifiedMaybeboardCards
    );

    const onEditDeck = () => {
        history.replace(`/decks/${publicID}/edit`);
    };

    const onExportDeck = async () => {
        if (!isUnmodified) {
            // Since the deck export comes from the backend, ensure we persist the latest deck state before exporting
            const saveResponse = await saveDeck(publicID, deckName, deckVisibility, deckCards, maybeboardCards);
            if (!saveResponse?.success) {
                const { text, type } = saveResponse?.message;
                showMessage(text, type);
                return;
            }
        }

        // Once changes to the deck have been saved, update the unmodified state
        setUnmodifiedDeckName();
        setUnmodifiedDeckVisibility();
        setUnmodifiedDeckCards();
        setUnmodifiedMaybeboardCards();

        const exportResponse = await exportDeck(publicID);
        if (!exportResponse?.success) {
            const { text, type } = exportResponse?.message;
            showMessage(text, type);
            return;
        }

        setDeckExport(exportResponse.deckExport);
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
