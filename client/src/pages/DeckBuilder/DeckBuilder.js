import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import useDeck from '../../hooks/useDeck';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import CardArtSelector from '../../components/CardArtSelector';
import DeckBuilderSearch from '../../components/DeckBuilderSearch';
import DeckActions from '../../components/DeckActions';
import DeckStats from '../../components/DeckStats';
import DeckTable from '../../components/DeckTable';
import Button from '../../components/Button';
import './DeckBuilder.scss';

function DeckBuilder() {
    const { publicID } = useParams();
    const { saveDeck, getDeck } = useDeck();
    const {
        setDeckAccountPublicID,
        deckName,
        setDeckName,
        deckVisibility,
        setDeckVisibility,
        deckCards,
        setDeckCards,
        maybeboardCards,
        setMaybeboardCards,
        unmodifiedDeckName,
        setUnmodifiedDeckName,
        unmodifiedDeckVisibility,
        setUnmodifiedDeckVisibility,
        unmodifiedDeckCards,
        setUnmodifiedDeckCards,
        unmodifiedMaybeboardCards,
        setUnmodifiedMaybeboardCards,
        maybeboardMode,
        setMaybeboardMode,
    } = useContext(DeckBuilderContext);
    const deckNotModified = isEqual(deckCards, unmodifiedDeckCards);
    const maybeboardNotModified = isEqual(maybeboardCards, unmodifiedMaybeboardCards);
    const nameNotModified = isEqual(deckName, unmodifiedDeckName);
    const visibilityNotModified = isEqual(deckVisibility, unmodifiedDeckVisibility);
    const isUnmodified = deckNotModified && maybeboardNotModified && nameNotModified && visibilityNotModified;

    useEffect(() => {
        const fetchDeck = async () => {
            const result = await getDeck(publicID);
            if (!result.success) {
                return;
            }

            const deck = result.cards.filter(c => c.location === 'deck');
            const maybeboard = result.cards.filter(c => c.location === 'maybeboard');
            setDeckAccountPublicID(result.accountPublicID);
            setDeckName(result.name);
            setDeckVisibility(result.visibility);
            setDeckCards(deck);
            setMaybeboardCards(maybeboard);
            setUnmodifiedDeckName();
            setUnmodifiedDeckVisibility();
            setUnmodifiedDeckCards();
            setUnmodifiedMaybeboardCards();
        };

        if (isUnmodified) {
            fetchDeck();
        }
    }, []);

    const onSaveDeck = async () => {
        const result = await saveDeck(publicID, deckName, deckVisibility, deckCards, maybeboardCards);
        if (!result.success) {
            return;
        }

        // Once changes to the deck have been saved, update the unmodified state
        setUnmodifiedDeckName();
        setUnmodifiedDeckVisibility();
        setUnmodifiedDeckCards();
        setUnmodifiedMaybeboardCards();
    };

    return (
        <div className='DeckBuilder'>
            <CardArtSelector />
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
