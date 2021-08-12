import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useDecks from '../../hooks/useDecks';
import useMessage from '../../hooks/useMessage';
import DeckBuilderContext, { isDeckUnmodified } from '../../contexts/DeckBuilder';
import CardImagePreviewContext from '../../contexts/CardImagePreview';
import CardArtSelector from '../../components/CardArtSelector';
import ExportDeckDialog from '../../components/ExportDeckDialog';
import CardImagePreview from '../../components/CardImagePreview';
import DeckBuilderSearch from '../../components/DeckBuilderSearch';
import DeckActions from '../../components/DeckActions';
import DeckStats from '../../components/DeckStats';
import DeckTable from '../../components/DeckTable';
import Button from '../../components/Button';
import './DeckBuilder.scss';

function DeckBuilder() {
    const { publicID } = useParams();
    const { saveDeck, getDeck } = useDecks();
    const {
        setDeckPublicID,
        setDeckAccountPublicID,
        deckName,
        setDeckName,
        deckVisibility,
        setDeckVisibility,
        deckNotes,
        setDeckNotes,
        deckCards,
        setDeckCards,
        maybeboardCards,
        setMaybeboardCards,
        unmodifiedDeckName,
        setUnmodifiedDeckName,
        unmodifiedDeckVisibility,
        setUnmodifiedDeckVisibility,
        unmodifiedDeckNotes,
        setUnmodifiedDeckNotes,
        unmodifiedDeckCards,
        setUnmodifiedDeckCards,
        unmodifiedMaybeboardCards,
        setUnmodifiedMaybeboardCards,
        maybeboardMode,
        setMaybeboardMode,
    } = useContext(DeckBuilderContext);
    const { showMessage } = useMessage();
    const { setVisible } = useContext(CardImagePreviewContext);
    const isUnmodified = isDeckUnmodified(
        deckName,
        deckVisibility,
        deckNotes,
        deckCards,
        maybeboardCards,
        unmodifiedDeckName,
        unmodifiedDeckVisibility,
        unmodifiedDeckNotes,
        unmodifiedDeckCards,
        unmodifiedMaybeboardCards
    );

    useEffect(() => {
        const fetchDeck = async () => {
            const response = await getDeck(publicID);
            if (!response?.success) {
                if (response?.message) {
                    const { text, type } = response?.message;
                    showMessage(text, type);
                }

                return;
            }

            const deck = response.cards.filter(c => c.location === 'deck');
            const maybeboard = response.cards.filter(c => c.location === 'maybeboard');
            setDeckPublicID(response.deckPublicID);
            setDeckAccountPublicID(response.accountPublicID);
            setDeckName(response.name);
            setDeckVisibility(response.visibility);
            setDeckNotes(response.notes);
            setDeckCards(deck);
            setMaybeboardCards(maybeboard);
            setUnmodifiedDeckName();
            setUnmodifiedDeckVisibility();
            setUnmodifiedDeckNotes();
            setUnmodifiedDeckCards();
            setUnmodifiedMaybeboardCards();
        };

        if (isUnmodified) {
            fetchDeck();
        }

        return () => setVisible(false);
    }, []);

    const onSaveDeck = async () => {
        const response = await saveDeck(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards);
        if (!response?.success) {
            if (response?.message) {
                const { text, type } = response?.message;
                showMessage(text, type);
            }

            return;
        }

        // Once changes to the deck have been saved, update the unmodified state
        setUnmodifiedDeckName();
        setUnmodifiedDeckVisibility();
        setUnmodifiedDeckNotes();
        setUnmodifiedDeckCards();
        setUnmodifiedMaybeboardCards();
    };

    return (
        <div className='DeckBuilder'>
            <CardArtSelector />
            <ExportDeckDialog />
            <CardImagePreview />
            <div className='DeckBuilder-displayPanel'>
                <DeckBuilderSearch />
            </div>
            <div className='DeckBuilder-deckPanel'>
                <div className='DeckBuilder-deckInfo'>
                    <div className='DeckBuilder-nameBar'>
                        <div className='DeckBuilder-name'>{deckName}</div>
                        <Button className={`DeckBuilder-saveButton ${isUnmodified ? 'u-hidden' : ''}`} onClick={onSaveDeck}>
                            Save
                        </Button>
                    </div>
                    <DeckActions />
                </div>
                <div className='DeckBuilder-tableContainer'>
                    <DeckStats deck={deckCards} />
                    <DeckTable
                        deckCards={deckCards}
                        maybeboardCards={maybeboardCards}
                        maybeboardMode={maybeboardMode}
                        setMaybeboardMode={setMaybeboardMode}
                    />
                </div>
            </div>
        </div>
    );
}

export default DeckBuilder;
