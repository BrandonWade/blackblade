import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import useDeck from '../../hooks/useDeck';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import DeckBuilderSearch from '../../components/DeckBuilderSearch';
import DeckStats from '../../components/DeckStats';
import DeckTable from '../../components/DeckList/DeckTable';
import Button from '../../components/Button';
import './DeckBuilder.scss';

const DeckBuilder = () => {
    const { publicID } = useParams();
    const { saveDeck, getDeck } = useDeck();
    const { deckName, setDeckName, deckCards, setDeckCards, unmodifiedDeckCards, setUnmodifiedDeckCards } = useContext(DeckBuilderContext);
    const unmodified = isEqual(deckCards, unmodifiedDeckCards);
    const creatures = deckCards.filter(card => card.sets_json[0].card_faces.some(face => face.derived_type === 'creature'));
    const spells = deckCards.filter(card =>
        card.sets_json[0].card_faces.some(face => face.derived_type !== 'creature' && face.derived_type !== 'land')
    );
    const lands = deckCards.filter(card => card.sets_json[0].card_faces.some(face => face.derived_type === 'land'));

    useEffect(() => {
        const fetchDeckCards = async () => {
            const result = await getDeck(publicID);
            if (!result.success) {
                console.error(result.errors); // TODO: Handle
                return;
            }

            setDeckName(result.name);
            setDeckCards(result.cards);
            setUnmodifiedDeckCards(result.cards);
        };

        if (unmodified) {
            fetchDeckCards();
        }
    }, []);

    const onSaveDeck = async () => {
        const result = await saveDeck(publicID, deckCards);
        if (!result.success) {
            console.error(result.errors); // TODO: Handle
            return;
        }

        // Once changes to the deck have been saved, update the unmodified state
        setUnmodifiedDeckCards(deckCards);
    };

    return (
        <div className='DeckBuilder'>
            <div className='DeckBuilder-searchPanel'>
                <DeckBuilderSearch />
            </div>
            <div className='DeckBuilder-deckPanel'>
                <div className='DeckBuilder-nameBar'>
                    <div className='DeckBuilder-name'>{deckName}</div>
                    <Button className={`DeckBuilder-saveButton ${unmodified ? 'u-hidden' : ''}`} onClick={onSaveDeck}>
                        Save
                    </Button>
                </div>
                <div className='DeckBuilder-tableContainer'>
                    <DeckStats deck={deckCards} />
                    {creatures.length > 0 ? <DeckTable deckCards={creatures} setDeckCards={setDeckCards} /> : null}
                    {spells.length > 0 ? <DeckTable deckCards={spells} setDeckCards={setDeckCards} /> : null}
                    {lands.length > 0 ? <DeckTable deckCards={lands} setDeckCards={setDeckCards} /> : null}
                </div>
            </div>
        </div>
    );
};

export default DeckBuilder;
