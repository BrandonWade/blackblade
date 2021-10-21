import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDecks from '../../hooks/useDecks';
import useSaveDeck from '../../hooks/useSaveDeck';
import useMessage from '../../hooks/useMessage';
import useIsDeckUnmodified from '../../hooks/useIsDeckUnmodified';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import ExportDeckDialogContext from '../../contexts/ExportDeckDialog';
import DeckActionButton from './DeckActionButton';
import { Pencil, Export } from '../Icons';
import './DeckActions.scss';

export default function DeckActions() {
    const { publicID } = useParams();
    const history = useHistory();
    const { exportDeck } = useDecks();
    const { saveDeckWithConfirmation } = useSaveDeck();
    const { showMessage } = useMessage();
    const { isDeckUnmodified } = useIsDeckUnmodified();
    const { accountPublicID } = useContext(AuthContext);
    const { deckAccountPublicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt } =
        useContext(DeckBuilderContext);
    const { setDeckExport, setVisible } = useContext(ExportDeckDialogContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;
    const hasCards = deckCards.length > 0 || maybeboardCards.length > 0;

    const onEditDeck = () => {
        history.push(`/decks/${publicID}/edit`);
    };

    const onExportDeck = async () => {
        if (!isDeckUnmodified()) {
            // Since the deck export comes from the backend, ensure we persist the latest deck state before exporting
            await saveDeckWithConfirmation(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, true);
        }

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
