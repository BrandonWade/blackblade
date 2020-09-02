import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import CardFaceContext from '../../contexts/CardFaceContext';
import HeaderPage from '../../components/HeaderPage';
import CardImage from '../../components/CardImage';
import CardDescription from '../../components/CardDescription';
import CardSets from '../../components/CardSets';
import './CardInfo.scss';

const CardInfo = () => {
    const history = useHistory();
    const { id } = useParams();
    const { cardFace, setCardFace, secondCardFace, setSecondCardFace } = useContext(CardFaceContext);
    const cardSets = JSON.parse(cardFace.set_name_image_json || '[]');
    const [selectedSetIndex, setSelectedSetIndex] = useState(0);
    const selectedSet = cardSets?.[selectedSetIndex] || {};
    const { getCardByID } = useSearch();

    useEffect(() => {
        const fetchCard = async () => {
            const response = await getCardByID(id);
            if (response.success) {
                if (response?.results.length === 1) {
                    setCardFace(response.results[0]);
                    setSecondCardFace();
                } else if (response?.results.length === 2 && response?.results[0].id === response?.results[1].id) {
                    setCardFace(response.results[0]);
                    setSecondCardFace(response.results[1]);
                } else {
                    history.push('/');
                }
            } else {
                history.push(response.redirect);
            }
        };
        fetchCard();
    }, [id]);

    useEffect(() => {
        setSelectedSetIndex(0);
    }, [cardFace]);

    return (
        <HeaderPage className='CardInfo'>
            <CardImage image={selectedSet.image} alt={cardFace.name} />
            <CardDescription cardFace={cardFace} secondCardFace={secondCardFace} />
            <CardSets cardSets={cardSets} selectedSetIndex={selectedSetIndex} setSelectedSetIndex={setSelectedSetIndex} />
        </HeaderPage>
    );
};

export default CardInfo;
