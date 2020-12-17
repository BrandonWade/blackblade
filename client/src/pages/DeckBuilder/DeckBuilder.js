import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import useDeck from '../../hooks/useDeck';
import useErrors from '../../hooks/useErrors';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import CardArtSelector from '../../components/CardArtSelector';
import DeckBuilderSearch from '../../components/DeckBuilderSearch';
import DeckActions from '../../components/DeckActions';
import DeckStats from '../../components/DeckStats';
import DeckTable from '../../components/DeckList/DeckTable';
import Button from '../../components/Button';
import './DeckBuilder.scss';

const DeckBuilder = () => {
    const { publicID } = useParams();
    const { saveDeck, getDeck } = useDeck();
    const { addErrors } = useErrors();
    const {
        deckName,
        setDeckName,
        deckCards,
        setDeckCards,
        maybeboardCards,
        setMaybeboardCards,
        unmodifiedDeckName,
        setUnmodifiedDeckName,
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
    const isUnmodified = deckNotModified && maybeboardNotModified && nameNotModified;

    useEffect(() => {
        const fetchDeck = async () => {
            const result = await getDeck(publicID);
            if (!result.success) {
                addErrors(result.errors);
                return;
            }

            const deck = result.cards.filter(c => c.location === 'deck');
            const maybeboard = result.cards.filter(c => c.location === 'maybeboard');
            setDeckName(result.name);
            setDeckCards(deck);
            setMaybeboardCards(maybeboard);
            setUnmodifiedDeckName(result.name);
            setUnmodifiedDeckCards(deck);
            setUnmodifiedMaybeboardCards(maybeboard);
        };

        if (isUnmodified) {
            fetchDeck();
        }
    }, [
        addErrors,
        getDeck,
        isUnmodified,
        publicID,
        setDeckCards,
        setMaybeboardCards,
        setDeckName,
        setUnmodifiedDeckCards,
        setUnmodifiedMaybeboardCards,
        setUnmodifiedDeckName,
    ]);

    const onSaveDeck = async () => {
        const result = await saveDeck(publicID, deckName, deckCards, maybeboardCards);
        if (!result.success) {
            addErrors(result.errors);
            return;
        }

        // Once changes to the deck have been saved, update the unmodified state
        setUnmodifiedDeckName(deckName);
        setUnmodifiedDeckCards(deckCards);
        setUnmodifiedMaybeboardCards(maybeboardCards);
    };

    return (
        <div className='DeckBuilder'>
            <CardArtSelector />
            <div className='DeckBuilder-searchPanel'>
                <DeckBuilderSearch />
            </div>
            <div className='DeckBuilder-deckPanel'>
                <div className='DeckBuilder-nameBar'>
                    <div className='DeckBuilder-name'>{deckName}</div>
                    <Button className={`DeckBuilder-saveButton ${isUnmodified ? 'u-hidden' : ''}`} onClick={onSaveDeck}>
                        Save
                    </Button>
                </div>
                <DeckActions />
                <div className='DeckBuilder-tableContainer'>
                    <DeckStats deck={deckCards} />
                    <DeckTable
                        deckCards={deckCards}
                        setDeckCards={setDeckCards}
                        maybeboardCards={maybeboardCards}
                        setMaybeboardCards={setMaybeboardCards}
                        maybeboardMode={maybeboardMode}
                        setMaybeboardMode={setMaybeboardMode}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeckBuilder;
