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
        unmodifiedDeckName,
        setUnmodifiedDeckName,
        unmodifiedDeckCards,
        setUnmodifiedDeckCards,
    } = useContext(DeckBuilderContext);
    const isUnmodified = isEqual(deckCards, unmodifiedDeckCards) && isEqual(deckName, unmodifiedDeckName);

    useEffect(() => {
        const fetchDeck = async () => {
            const result = await getDeck(publicID);
            if (!result.success) {
                addErrors(result.errors);
                return;
            }

            setDeckName(result.name);
            setDeckCards(result.cards);
            setUnmodifiedDeckName(result.name);
            setUnmodifiedDeckCards(result.cards);
        };

        if (isUnmodified) {
            fetchDeck();
        }
    }, [addErrors, getDeck, isUnmodified, publicID, setDeckCards, setDeckName, setUnmodifiedDeckCards, setUnmodifiedDeckName]);

    const onSaveDeck = async () => {
        const result = await saveDeck(publicID, deckName, deckCards);
        if (!result.success) {
            addErrors(result.errors);
            return;
        }

        // Once changes to the deck have been saved, update the unmodified state
        setUnmodifiedDeckName(deckName);
        setUnmodifiedDeckCards(deckCards);
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
                    <DeckTable deckCards={deckCards} setDeckCards={setDeckCards} />
                </div>
            </div>
        </div>
    );
};

export default DeckBuilder;
