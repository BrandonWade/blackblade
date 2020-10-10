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
        displayResults(response, {}, false);
    };

    useEffect(() => {
        if (card.card_id !== parseInt(id)) {
            fetchCard();
        }
    }, [id]);

    return (
        <HeaderPage className='Card'>
            <CardImage cardFaces={selectedSet.card_faces} layout={card.layout} />
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
