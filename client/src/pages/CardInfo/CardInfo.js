import React, { useState, useContext, useEffect } from 'react';
import CardContext from '../../contexts/CardContext';
import HeaderPage from '../../components/HeaderPage';
import CardImage from '../../components/CardImage';
import CardDescription from '../../components/CardDescription';
import CardSets from '../../components/CardSets';
import './CardInfo.scss';

const CardInfo = () => {
    const { card } = useContext(CardContext);
    const cardSets = JSON.parse(card?.sets || '[]');
    const [selectedSetIndex, setSelectedSetIndex] = useState(0);
    const selectedSet = cardSets?.[selectedSetIndex] || {};

    useEffect(() => {
        setSelectedSetIndex(0);
    }, [card]);

    return (
        <HeaderPage className='CardInfo'>
            <CardImage image={selectedSet.image} alt={`${selectedSet.set_name} ${card.name}`} />
            <CardDescription card={card} />
            <CardSets cardSets={cardSets} selectedSetIndex={selectedSetIndex} setSelectedSetIndex={setSelectedSetIndex} />
        </HeaderPage>
    );
};

export default CardInfo;
