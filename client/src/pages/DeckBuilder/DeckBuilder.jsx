import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useIsDeckUnmodified from '../../hooks/useIsDeckUnmodified';
import useLoadDeck from '../../hooks/useLoadDeck';
import useDebouncedPersistDeck from '../../hooks/useDebouncedPersistDeck';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import CardImagePreviewContext from '../../contexts/CardImagePreview';
import HeaderPage from '../../components/HeaderPage';
import CardArtSelector from '../../components/CardArtSelector';
import DrawHandDialog from '../../components/DrawHandDialog';
import ExportDeckDialog from '../../components/ExportDeckDialog';
import CardImagePreview from '../../components/CardImagePreview';
import DeckBuilderTabs from '../../components/DeckBuilderTabs';
import DeckPreview from '../../components/DeckPreview';
import SaveIndicator from '../../components/SaveIndicator';
import DeckActions from '../../components/DeckActions';
import DeckStats from '../../components/DeckStats';
import DeckTable from '../../components/DeckTable';
import DeckBuilderName from './DeckBuilderName';
import './DeckBuilder.scss';

function DeckBuilder({ loading = false }) {
    const { publicID } = useParams();
    const debouncedPersistDeck = useDebouncedPersistDeck();
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
        selectedTab,
        setSelectedTab,
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
            <DrawHandDialog />
            <ExportDeckDialog />
            <CardImagePreview />
            <div className='DeckBuilder-displayPanel'>
                {ownsDeck ? (
                    <DeckBuilderTabs loading={loading} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                ) : (
                    <DeckPreview loading={loading} />
                )}
            </div>
            <div className='DeckBuilder-deckPanel'>
                <div className='DeckBuilder-deckInfo'>
                    <div className='DeckBuilder-nameBar'>
                        <DeckBuilderName loading={loading} name={deckName} />
                        {deckExists && ownsDeck && !loading ? <SaveIndicator /> : null}
                    </div>
                    <DeckActions loading={loading} deckExists={deckExists} />
                </div>
                <div className='DeckBuilder-tableContainer'>
                    <DeckStats loading={loading} deck={deckCards} />
                    <DeckTable
                        loading={loading}
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

DeckBuilder.propTypes = {
    loading: PropTypes.bool,
};

export default DeckBuilder;
