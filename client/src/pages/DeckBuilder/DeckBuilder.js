import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';
import useDecks from '../../hooks/useDecks';
import useDeckBuilderTabs from '../../hooks/useDeckBuilderTabs';
import useIsDeckUnmodified from '../../hooks/useIsDeckUnmodified';
import useFetchDeck from '../../hooks/useFetchDeck';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import CardImagePreviewContext from '../../contexts/CardImagePreview';
import CardArtSelector from '../../components/CardArtSelector';
import ExportDeckDialog from '../../components/ExportDeckDialog';
import CardImagePreview from '../../components/CardImagePreview';
import TabStrip from '../../components/TabStrip';
import DeckPreview from '../../components/DeckPreview';
import DeckActions from '../../components/DeckActions';
import DeckStats from '../../components/DeckStats';
import DeckTable from '../../components/DeckTable';
import Button from '../../components/Button';
import './DeckBuilder.scss';
import BackgroundMessage from '../../components/BackgroundMessage';

function DeckBuilder() {
    const { publicID } = useParams();
    const { showMessage } = useMessage();
    const { saveDeck } = useDecks();
    const deckBuilderTabs = useDeckBuilderTabs();
    const { isDeckUnmodified } = useIsDeckUnmodified();
    const { fetchDeck } = useFetchDeck();
    const { accountPublicID } = useContext(AuthContext);
    const {
        deckAccountPublicID,
        deckName,
        deckVisibility,
        deckNotes,
        deckCards,
        maybeboardCards,
        updateUnmodifiedState,
        selectedTabIndex,
        setSelectedTabIndex,
        maybeboardMode,
        setMaybeboardMode,
        deckExists,
    } = useContext(DeckBuilderContext);
    const { setVisible } = useContext(CardImagePreviewContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;

    useEffect(() => {
        if (isDeckUnmodified()) {
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
        updateUnmodifiedState();
    };

    return (
        <div className='DeckBuilder'>
            <CardArtSelector />
            <ExportDeckDialog />
            <CardImagePreview />
            <div className='DeckBuilder-displayPanel'>
                <BackgroundMessage showMessage={!deckExists}>
                    {ownsDeck ? (
                        <TabStrip tabs={deckBuilderTabs} selectedTabIndex={selectedTabIndex} setSelectedTabIndex={setSelectedTabIndex} />
                    ) : (
                        <DeckPreview />
                    )}
                </BackgroundMessage>
            </div>
            <div className='DeckBuilder-deckPanel'>
                <div className='DeckBuilder-deckInfo'>
                    <div className='DeckBuilder-nameBar'>
                        <div className='DeckBuilder-name'>{deckName}</div>
                        <Button className={`DeckBuilder-saveButton ${isDeckUnmodified() ? 'u-hidden' : ''}`} onClick={onSaveDeck}>
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
