import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { shuffle } from 'lodash';
import useDecks from '../../hooks/useDecks';
import usePersistDeck from '../../hooks/usePersistDeck';
import useIsDeckUnmodified from '../../hooks/useIsDeckUnmodified';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import ExportDeckDialogContext from '../../contexts/ExportDeckDialog';
import DrawHandContextDialogContext from '../../contexts/DrawHandDialog';
import { inflateDeck } from '../../helpers/deck';
import DeckActionButton from './DeckActionButton';
import { Pencil, Documents, Export } from '../Icons';
import './DeckActions.scss';

export default function DeckActions({ deckExists = false }) {
    const { publicID } = useParams();
    const history = useHistory();
    const { exportDeck } = useDecks();
    const { persistDeckWithConfirmation } = usePersistDeck();
    const { isDeckUnmodified } = useIsDeckUnmodified();
    const { accountPublicID } = useContext(AuthContext);
    const { deckAccountPublicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt } =
        useContext(DeckBuilderContext);
    const { setDeckExport, setVisible: setExportDeckDialogVisible } = useContext(ExportDeckDialogContext);
    const { setHand, setVisible: setDrawHandDialogVisible } = useContext(DrawHandContextDialogContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;
    const hasCards = deckCards.length > 0 || maybeboardCards.length > 0;

    const onEditDeck = () => {
        history.push(`/decks/${publicID}/edit`);
    };

    const onDrawHand = () => {
        const deck = inflateDeck(deckCards);
        const shuffledDeck = shuffle(deck);
        const cardsToDraw = Math.min(shuffledDeck.length, 7);

        setHand(shuffledDeck.slice(0, cardsToDraw));
        setDrawHandDialogVisible(true);
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
        setExportDeckDialogVisible(true);
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
