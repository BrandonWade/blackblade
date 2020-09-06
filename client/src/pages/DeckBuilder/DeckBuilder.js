import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import DeckBuilderSearch from '../../components/DeckBuilderSearch';
import DeckTable from '../../components/DeckList/DeckTable';
import './DeckBuilder.scss';

const DeckBuilder = () => {
    const { publicID } = useParams();
    const { getCardsByPublicID } = useDeck();
    const { deckName, deckCards, setDeckCards } = useContext(DeckBuilderContext);

    useEffect(() => {
        const fetchDeckCards = async () => {
            const result = await getCardsByPublicID(publicID);
            if (!result.success) {
                console.error(result.errors); // TODO: Handle
                return;
            }
            setDeckCards(result.cards);
        };
        fetchDeckCards();
    }, []);

    return (
        <div className='DeckBuilder'>
            <div className='DeckBuilder-searchPanel'>
                <DeckBuilderSearch />
            </div>
            <div className='DeckBuilder-deckPanel'>
                <div className='DeckBuilder-name'>{deckName}</div>
                <DeckTable deckCards={deckCards} setDeckCards={setDeckCards} />
            </div>
        </div>
    );
};

export default DeckBuilder;
