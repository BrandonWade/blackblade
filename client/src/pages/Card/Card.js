import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import CardFaceContext from '../../contexts/CardFaceContext';
import HeaderPage from '../../components/HeaderPage';
import CardImage from '../../components/CardImage';
import CardFace from '../../components/CardFace';
import CardSets from '../../components/CardSets';
import './Card.scss';

const Card = () => {
    const { id } = useParams();
    const { primaryCardFace, secondaryCardFace } = useContext(CardFaceContext);
    const cardSets = JSON.parse(primaryCardFace.set_name_image_json || '[]');
    const [selectedSetIndex, setSelectedSetIndex] = useState(0);
    const selectedSet = cardSets?.[selectedSetIndex] || {};
    const { getCardByID } = useSearch();
    const { displayResults } = useDisplayResults();
    const cardFaces = [primaryCardFace, secondaryCardFace].filter(face => face?.card_id !== undefined);

    // TODO: Handle case where id in route is invalid (e.g. /cards/99999)
    const fetchCard = async () => {
        const response = await getCardByID(id);
        displayResults(response);
    };

    useEffect(() => {
        fetchCard();
    }, [id]);

    useEffect(() => {
        setSelectedSetIndex(0);
    }, [primaryCardFace]);

    return (
        <HeaderPage className='Card'>
            <CardImage image={selectedSet.image} alt={primaryCardFace.name} />
            <div>
                {cardFaces.map(face => {
                    return <CardFace key={face.face_id} face={face} />;
                })}
            </div>
            <CardSets cardSets={cardSets} selectedSetIndex={selectedSetIndex} setSelectedSetIndex={setSelectedSetIndex} />
        </HeaderPage>
    );
};

export default Card;
