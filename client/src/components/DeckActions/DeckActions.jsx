import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import useDecks from '../../hooks/useDecks';
import usePersistDeck from '../../hooks/usePersistDeck';
import useIsDeckUnmodified from '../../hooks/useIsDeckUnmodified';
import useDrawHand from '../../hooks/useDrawHand/useDrawHand';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import ExportDeckDialogContext from '../../contexts/ExportDeckDialog';
import DeckActionButton from './DeckActionButton';
import { Pencil, Documents, Export } from '../Icons';
import LoadingSkeleton from '../LoadingSkeleton';
import './DeckActions.scss';

function DeckActions({ loading = false, deckExists = false }) {
    const { publicID } = useParams();
    const history = useHistory();
    const { exportDeck } = useDecks();
    const { persistDeckWithConfirmation } = usePersistDeck();
    const { isDeckUnmodified } = useIsDeckUnmodified();
    const { drawHand } = useDrawHand();
    const { accountPublicID } = useContext(AuthContext);
    const { deckAccountPublicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt } =
        useContext(DeckBuilderContext);
    const { setDeckExport, setVisible } = useContext(ExportDeckDialogContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;
    const hasCards = deckCards.length > 0 || maybeboardCards.length > 0;

    if (loading) {
        return (
            <div className='DeckActions'>
                {new Array(3).fill().map((_, i) => (
                    <LoadingSkeleton key={i} className='DeckActions-buttonLabel--loading' />
                ))}
            </div>
        );
    }

    const onEditDeck = () => {
        history.push(`/decks/${publicID}/edit`);
    };

    const onDrawHand = () => {
        drawHand();
    };

    const onExportDeck = async () => {
        if (!isDeckUnmodified()) {
            // Since the deck export comes from the backend, ensure we persist the latest deck state before exporting
            await persistDeckWithConfirmation(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, true);
        }

        const response = await exportDeck(publicID);
        if (!response.success) {
            return;
        }

        setDeckExport(response.deckExport);
        setVisible(true);
    };

    return (
        <div className='DeckActions'>
            <DeckActionButton visible={ownsDeck} onClick={onEditDeck}>
                <Pencil />
                <span className='DeckActions-buttonLabel'>Edit Deck</span>
            </DeckActionButton>
            <DeckActionButton visible={deckExists} onClick={onDrawHand}>
                <Documents />
                <span className='DeckActions-buttonLabel'>Draw Hand</span>
            </DeckActionButton>
            <DeckActionButton visible={hasCards} onClick={onExportDeck}>
                <Export />
                <span className='DeckActions-buttonLabel'>Export Deck</span>
            </DeckActionButton>
        </div>
    );
}

DeckActions.propTypes = {
    loading: PropTypes.bool,
    deckExists: PropTypes.bool,
};

export default DeckActions;
