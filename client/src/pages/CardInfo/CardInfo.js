import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import CardContext from '../../contexts/CardContext';
import HeaderPage from '../../components/HeaderPage';
import CardImage from '../../components/CardImage';
import CardDescription from '../../components/CardDescription';
import CardSets from '../../components/CardSets';
import './CardInfo.scss';

const CardInfo = () => {
    const history = useHistory();
    const { id } = useParams();
    const { card, setCard, secondFace, setSecondFace } = useContext(CardContext);
    const cardSets = JSON.parse(card.set_name_image_json || '[]');
    const [selectedSetIndex, setSelectedSetIndex] = useState(0);
    const selectedSet = cardSets?.[selectedSetIndex] || {};
    const { getCardByID } = useSearch();

    useEffect(() => {
        const fetchCard = async () => {
            const response = await getCardByID(id);
            if (response.success) {
                if (response?.results.length === 1) {
                    setCard(response.results[0]);
                    setSecondFace();
                } else if (response?.results.length === 2 && response?.results[0].id === response?.results[1].id) {
                    setCard(response.results[0]);
                    setSecondFace(response.results[1]);
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
    }, [card]);

    return (
        <HeaderPage className='CardInfo'>
            <CardImage image={selectedSet.image} alt={card.name} />
            <CardDescription card={card} secondFace={secondFace} />
            <CardSets cardSets={cardSets} selectedSetIndex={selectedSetIndex} setSelectedSetIndex={setSelectedSetIndex} />
        </HeaderPage>
    );
};

export default CardInfo;
