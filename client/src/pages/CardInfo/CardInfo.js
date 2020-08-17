import React from 'react';
import HeaderPage from '../../components/HeaderPage';
import CardImage from '../../components/CardImage';
import CardDescription from '../../components/CardDescription';
import CardSets from '../../components/CardSets';
import './CardInfo.scss';

const CardInfo = () => {
    return (
        <HeaderPage className='CardInfo'>
            <CardImage />
            <CardDescription />
            <CardSets />
        </HeaderPage>
    );
};

export default CardInfo;
