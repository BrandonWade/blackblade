import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useDeckBuilderTabs from '../../hooks/useDeckBuilderTabs';
import useIsDeckUnmodified from '../../hooks/useIsDeckUnmodified';
import useLoadDeck from '../../hooks/useLoadDeck';
import useDebouncedPersistDeck from '../../hooks/useDebouncedPersistDeck';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import CardImagePreviewContext from '../../contexts/CardImagePreview';
import HeaderPage from '../../components/HeaderPage';
import CardArtSelector from '../../components/CardArtSelector';
import ExportDeckDialog from '../../components/ExportDeckDialog';
import CardImagePreview from '../../components/CardImagePreview';
import TabStrip from '../../components/TabStrip';
import BackgroundMessage from '../../components/BackgroundMessage';
import DeckPreview from '../../components/DeckPreview';
import SaveIndicator from '../../components/SaveIndicator';
import DeckActions from '../../components/DeckActions';
import DeckStats from '../../components/DeckStats';
import DeckTable from '../../components/DeckTable';
import './DeckBuilder.scss';

export default function DeckBuilder() {
    const { publicID } = useParams();
    const debouncedPersistDeck = useDebouncedPersistDeck();
    const { getDeckBuilderTabs } = useDeckBuilderTabs();
    const { isDeckUnmodified } = useIsDeckUnmodified();
    const { loadDeck } = useLoadDeck();
    const { accountPublicID } = useContext(AuthContext);
    const {
        deckAccountPublicID,
        deckName,
        deckVisibility,
        deckNotes,
        deckCards,
        maybeboardCards,
        deckLastUpdatedAt,
        selectedTabIndex,
        setSelectedTabIndex,
        maybeboardMode,
        setMaybeboardMode,
        deckExists,
        isSaving,
    } = useContext(DeckBuilderContext);
    const { setVisible } = useContext(CardImagePreviewContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;

    useEffect(() => {
        if (isDeckUnmodified()) {
            loadDeck();
        }

        return () => setVisible(false);
    }, []);

    useEffect(() => {
        if (deckExists && !isDeckUnmodified()) {
            // If a save is in progress, overwrite the existing deck to prevent successive saves from causing an edit conflict
            debouncedPersistDeck(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt, isSaving);
        }
    }, [deckName, deckVisibility, deckNotes, deckCards, maybeboardCards]);

    return (
        <HeaderPage className='DeckBuilder'>
            <CardArtSelector />
            <ExportDeckDialog />
            <CardImagePreview />
            <div className='DeckBuilder-displayPanel'>
                <BackgroundMessage showMessage={!deckExists}>
                    {ownsDeck ? (
                        <TabStrip tabs={getDeckBuilderTabs()} selectedTabIndex={selectedTabIndex} setSelectedTabIndex={setSelectedTabIndex} />
                    ) : (
                        <DeckPreview />
                    )}
                </BackgroundMessage>
            </div>
            <div className='DeckBuilder-deckPanel'>
                <div className='DeckBuilder-deckInfo'>
                    <div className='DeckBuilder-nameBar'>
                        {deckExists ? <div className='DeckBuilder-name'>{deckName}</div> : null}
                        {deckExists && ownsDeck ? <SaveIndicator /> : null}
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
        </HeaderPage>
    );
}
