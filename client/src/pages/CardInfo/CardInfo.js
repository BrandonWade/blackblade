import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults/useDisplayResults';
import SearchResultsContext from '../../contexts/SearchResultsContext';
import CardFaceContext from '../../contexts/CardFaceContext';
import HeaderPage from '../../components/HeaderPage';
import CardImage from '../../components/CardImage';
import CardDescription from '../../components/CardDescription';
import CardSets from '../../components/CardSets';
import './CardInfo.scss';

const CardInfo = () => {
    const { id } = useParams();
    const { query } = useContext(SearchResultsContext);
    const { primaryCardFace, secondaryCardFace } = useContext(CardFaceContext);
    const cardSets = JSON.parse(primaryCardFace.set_name_image_json || '[]');
    const [selectedSetIndex, setSelectedSetIndex] = useState(0);
    const selectedSet = cardSets?.[selectedSetIndex] || {};
    const { getCardByID } = useSearch();
    const { displayResults } = useDisplayResults();

    // TODO: Handle case where id in route is invalid (e.g. /cards/99999)
    const fetchCard = async () => {
        const response = await getCardByID(id);
        displayResults(response, query);
    };

    useEffect(() => {
        fetchCard();
    }, [id]);

    useEffect(() => {
        setSelectedSetIndex(0);
    }, [primaryCardFace]);

    return (
        <HeaderPage className='CardInfo'>
            <CardImage image={selectedSet.image} alt={primaryCardFace.name} />
            <CardDescription primaryCardFace={primaryCardFace} secondaryCardFace={secondaryCardFace} />
            <CardSets cardSets={cardSets} selectedSetIndex={selectedSetIndex} setSelectedSetIndex={setSelectedSetIndex} />
        </HeaderPage>
    );
};

export default CardInfo;
