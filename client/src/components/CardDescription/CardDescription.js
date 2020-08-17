import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import Card from '../Card';
import './CardDescription.scss';

const CardDescription = () => {
    const card = useContext(CardContext);

    const renderText = () => {
        const lines = card.text.split('\n');
        return lines.map(l => (
            <p key={l} className='CardInfo-textBlock'>
                {l}
            </p>
        ));
    };

    return (
        <Card className='CardInfo-description'>
            <h2 className='Card-rowItem Card-title'>
                {card.title}
                <span className='CardInfo-manaCost'>{card.manaCost}</span>
            </h2>
            <div className='Card-rowItem CardInfo-type'>{card.type}</div>
            <div className='Card-rowItem CardInfo-text'>{renderText()}</div>
            <div className='Card-rowItem CardInfo-stats'>{card.stats}</div>
        </Card>
    );
};

export default CardDescription;
