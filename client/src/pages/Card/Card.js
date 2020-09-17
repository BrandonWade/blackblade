import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import CardContext from '../../contexts/CardContext';
import HeaderPage from '../../components/HeaderPage';
import CardImage from '../../components/CardImage';
import CardFace from '../../components/CardFace';
import CardSets from '../../components/CardSets';
import './Card.scss';

const Card = () => {
    const { id } = useParams();
    const { card } = useContext(CardContext);
    const [selectedSetIndex, setSelectedSetIndex] = useState(0);
    const selectedSet = card?.sets_json?.[selectedSetIndex] || {};
    const cardFaces = selectedSet?.card_faces || [];
    const { getCardByID } = useSearch();
    const { displayResults } = useDisplayResults();

    // TODO: Handle case where id in route is invalid (e.g. /cards/99999)
    const fetchCard = async () => {
        const response = await getCardByID(id);
        displayResults(response, '', 1, true);
    };

    useEffect(() => {
        fetchCard();
    }, [id]);

    useEffect(() => {
        setSelectedSetIndex(0);
    }, [card]);

    return (
        <HeaderPage className='Card'>
            <CardImage image={selectedSet?.card_faces?.[0]?.image} alt={cardFaces?.[0]?.name} />
            <div>
                {cardFaces?.map(face => {
                    return <CardFace key={face.face_id} face={face} />;
                })}
            </div>
            <CardSets cardSets={card.sets_json} selectedSetIndex={selectedSetIndex} setSelectedSetIndex={setSelectedSetIndex} />
        </HeaderPage>
    );
};

export default Card;
