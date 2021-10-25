import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useDeckBuilderTabs from '../../hooks/useDeckBuilderTabs';
import useIsDeckUnmodified from '../../hooks/useIsDeckUnmodified';
import useFetchDeck from '../../hooks/useFetchDeck';
import useDebouncedSaveDeck from '../../hooks/useDebouncedSaveDeck';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import CardImagePreviewContext from '../../contexts/CardImagePreview';
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
    const debouncedSaveDeck = useDebouncedSaveDeck();
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
        deckLastUpdatedAt,
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

    useEffect(() => {
        if (deckExists && !isDeckUnmodified()) {
            debouncedSaveDeck(publicID, deckName, deckVisibility, deckNotes, deckCards, maybeboardCards, deckLastUpdatedAt);
        }
    }, [deckName, deckVisibility, deckNotes, deckCards, maybeboardCards]);

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
                        {deckExists ? (
                            <>
                                <div className='DeckBuilder-name'>{deckName}</div>
                                <SaveIndicator />
                            </>
                        ) : null}
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
